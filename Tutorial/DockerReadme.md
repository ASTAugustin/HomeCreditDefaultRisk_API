# 基础的Docker应用教程
Done by *Lei TAN*

## Docker 流程图

|  Stage 0 | Stage 1  | Stage 2 | Stage3 | 
|  ----  | ----  | ----  | ----  |
|  Dockerfile + Source Files  | Image  | Container | API Test |


## Stage 0: Dockerfile + Source Files
这个阶段是在服务器上的核心代码写好之后，即 Source Files 已经完成了。我们需要创建Dockerfile 来在服务器上构建出一个可以运行Source Files 的环境，并能够提供相应的服务。Dockerfile 文件是一个文本文件，用来配置 image。Docker 根据该文件生成二进制的 image 文件。Dockerfile 包含了以下的信息：

|  命令名  | 用处  | 例子|
|  ----  | ----  | ---- |
| From | 下载安装编译环境  | FROM python:3.7-slim |
|  RUN  | 下载安装提供服务必要的库等  | RUN pip install -i http://pypi.douban.com/simple/ --trusted-host=pypi.douban.com/simple flask gunicorn tensorflow numpy |
|  WORKDIR  | 确定自己在镜像文件中的位置（在COPY等之前） | WORKDIR /usr/src/app |
|  COPY  | 将 Source Files 载入到镜像中（对于目录，只复制内容不复制本身）Dockerfile 所在的目录为默认目录  | COPY app.py . （or）COPY model ./model |
|  Expose  | 暴露提供服务的端口  | Expose 8080 |
|  CMD  | 在容器启动后执行的命令，用来启动服务 | CMD [ "gunicorn", "-w", "4", "-b", ":8080", "app:app" ] |

我们要使用以下语句来生成镜像文件：

``` docker
docker image build -t Name_Image
```

### Gunicorn and Flask

一个Web应用的本质是：
1. 浏览器发送一个HTTP请求；
2. 服务器收到请求，生成一个HTML文档；
3. 服务器把HTML文档作为HTTP响应的Body发送给浏览器；
4. 浏览器收到HTTP响应，从HTTP Body取出HTML文档并显示。

为了动态生成HTML，并省略接受HTTP请求、解析HTTP请求、发送HTTP响应等过程，底层代码应当由专门的服务器软件实现。这个服务器的接口就是WSGI：Web Server Gateway Interface，而Gunicorn是Python下的一个WSGI服务器。它使用了prefork-worker模式，即多进程和多线程的混合模式。Gunicorn会提前分配worker个数，即进程的个数，同时一个进程也有多个线程同时工作。在上文的例子中 -w 表示 worker 的个数，-b 表示开放的 socket端口。

```
gunicorn [OPTIONS] 模块名：变量名
模块名：python文件名 或 完整的路径+python文件名；
变量名：python文件中可调用的WSGI（Web Server Gateway ）.
```

相对应的，Flask 是一个使用 Python 编写的轻量级 Web 应用程序框架。在样例中，我们的 app.py 就是由Flask编写的。我们来看 app.py 的例子：

``` python
from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow import keras
import numpy as np

model = None

app = Flask(__name__)


@app.route("/model", methods=['POST'])
def call():
    global model
    payload = request.json
    age = payload.get('Age')
    fare = payload.get('Fare')
    embarked = payload.get('Embarked')
    sex = payload.get('Sex')
    pclass = payload.get('Pclass')

    if model is None:
        model = keras.models.load_model('./model', compile=True)

    X = {
        'Age': np.array([age], dtype='float32'),
        'Fare': np.array([fare], dtype='float32'),
        'Embarked': np.array([embarked], dtype='str'),
        'Sex': np.array([sex], dtype='str'),
        'Pclass': np.array([pclass], dtype='int64')
    }

    Y = model.predict(X)

    return jsonify({'predict': float(Y[0][0])})


if __name__ == "__main__":
    app.run(port="8080")
```


其中最重要的就是：

``` python
# 创建 Flask 对象
app = Flask(__name__)

# 这告诉了我们对"/model"的'POST'都被视为对call的调用
@app.route("/model", methods=['POST'])
def call():
    ...

# 启动一个本地服务器，端口为8080！
if __name__ == "__main__":
    app.run(port="8080")
```
我们使用 Flask 编写 Web 应用，之后使用 Gunicorn 部署它。

## Stage 1: Image

Docker 把应用程序及其依赖，打包在 image 文件里面。只有通过这个文件，才能生成 Docker 容器。image 文件可以看作是容器的模板。Docker 根据 image 文件生成容器的实例。同一个 image 文件，可以生成多个同时运行的容器实例。

我们要使用以下语句来根据镜像文件生成容器实例：
``` docker
docker container run Name_Image #生成容器
docker container ls # 列出本机正在运行的容器信息
docker container kill [containID] # 终止容器
```

## Stage 2: Container

image 文件生成的容器实例，本身也是一个文件，称为容器文件。也就是说，一旦容器生成，就会同时存在两个文件： image 文件和容器文件。而且关闭容器并不会删除容器文件，只是容器停止运行而已。终止运行的容器文件，依然会占据硬盘空间，可以使用docker container rm命令删除。

``` docker
docker container rm [containerID]
```

## Stage 3: API Test
至此我们已经完成了一个服务，接下来就是尝试调用它。在 Postman 中指定 gunicorn 规定的接口（同时也是 Dockerfile 中暴露的端口），并向它发送一个满足格式要求的请求。如果一切正常，我们能够顺利的收到 Response。

## Reference

1. https://segmentfault.com/a/1190000017330435
2. https://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html
3. https://www.jianshu.com/p/803899379e23
