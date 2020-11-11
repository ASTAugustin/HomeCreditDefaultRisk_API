# Pipeline, FeatureUnion, ColumnTransformer  用法说明

## 什么是 Pipeline？

Pipeline 叫做链式评估器，它可以把多个评估器连成一个，从而增加模型的便捷性，封装性和安全性。管道中的所有评估器，除了最后一个评估器，其他的评估器必须是转换器。(例如，必须有 transform 方法)。 最后一个评估器的类型不限（转换器、分类器等等）。

## Pipeline 用法

Pipeline 使用一系列 (key, value) 键值对来构建,其中 key 是你给这个步骤起的名字， value 是一个评估器对象:

``` python
>>> estimators = [('reduce_dim', PCA()), ('clf', SVC())]
>>> pipe = Pipeline(estimators)
>>> pipe
Pipeline(memory=None,
         steps=[('reduce_dim', PCA(copy=True,...)),
                ('clf', SVC(C=1.0,...))], verbose=False)
```
管道中的评估器作为一个列表保存在 steps 属性内,但可以通过索引或名称([idx])访问管道:

``` python
>>> pipe.steps[0]  
('reduce_dim', PCA(copy=True, iterated_power='auto', n_components=None,
                   random_state=None, svd_solver='auto', tol=0.0,
                   whiten=False))
>>> pipe[0]  
PCA(copy=True, iterated_power='auto', n_components=None, random_state=None,
    svd_solver='auto', tol=0.0, whiten=False)
>>> pipe['reduce_dim']  
PCA(copy=True, ...)
```

管道中的评估器参数可以通过 estimator__parameter 语义来访问:

``` python
>>> pipe.set_params(clf__C=10)
Pipeline(memory=None,
         steps=[('reduce_dim', PCA(copy=True, iterated_power='auto',...)),
                ('clf', SVC(C=10, cache_size=200, class_weight=None,...))],
         verbose=False)

>>> from sklearn.linear_model import LogisticRegression
>>> param_grid = dict(reduce_dim=['passthrough', PCA(5), PCA(10)],
...                   clf=[SVC(), LogisticRegression()],
...                   clf__C=[0.1, 10, 100])
>>> grid_search = GridSearchCV(pipe, param_grid=param_grid)         
```

## 什么是 FeatureUnion？

FeatureUnion 叫做特征联合。FeatureUnion 合并了多个转换器对象形成一个新的转换器，该转换器合并了他们的输出。一个 FeatureUnion 可以接收多个转换器对象。在适配期间，每个转换器都**单独的**和数据适配。 对于转换数据，转换器可以**并发**使用，且输出的样本向量被连接成更大的向量。

## FeatureUnion 用法

和 Pipeline 一样，一个 FeatureUnion 是通过一系列 (key, value) 键值对来构建的：

``` python
>>> from sklearn.pipeline import FeatureUnion
>>> from sklearn.decomposition import PCA
>>> from sklearn.decomposition import KernelPCA
>>> estimators = [('linear_pca', PCA()), ('kernel_pca', KernelPCA())]
>>> combined = FeatureUnion(estimators)
>>> combined
FeatureUnion(n_jobs=None,
             transformer_list=[('linear_pca', PCA(copy=True,...)),
                               ('kernel_pca', KernelPCA(alpha=1.0,...))],
             transformer_weights=None, verbose=False)
```

## 什么是 ColumnTransformer？

ColumnTransformer 叫做异构数据的列转换器。许多数据集包含不同类型的特性，比如文本、浮点数和日期，每种类型的特征都需要单独的预处理或特征提取步骤。compose.ColumnTransformer对数据的不同列执行不同的变换，该管道不存在数据泄漏，并且可以参数化。

## ColumnTransformer 用法

对于数据：

``` python
>>> import pandas as pd
>>> X = pd.DataFrame(
...     {'city': ['London', 'London', 'Paris', 'Sallisaw'],
...      'title': ["His Last Bow", "How Watson Learned the Trick",
...                "A Moveable Feast", "The Grapes of Wrath"],
...      'expert_rating': [5, 3, 4, 5],
...      'user_rating': [4, 5, 4, 3]})
```

对于这些数据，我们可能希望使用preprocessing.OneHotEncoder将city列编码为一个分类变量,同时使用feature_extraction.text.CountVectorizer来处理title列。由于我们可能会把多个特征抽取器用在同一列上, 我们给每一个变换器取一个唯一的名字，比如“city_category”和“title_bow”。默认情况下，忽略其余的ranking列(remainder='drop'):

``` python
>>> from sklearn.compose import ColumnTransformer
>>> from sklearn.feature_extraction.text import CountVectorizer
>>> column_trans = ColumnTransformer(
...     [('city_category', CountVectorizer(analyzer=lambda x: [x]), 'city'),
...      ('title_bow', CountVectorizer(), 'title')],
...     remainder='drop')

>>> column_trans.fit(X)
ColumnTransformer(n_jobs=None, remainder='drop', sparse_threshold=0.3,
    transformer_weights=None,
    transformers=...)

>>> column_trans.get_feature_names()
...
['city_category__London', 'city_category__Paris', 'city_category__Sallisaw',
'title_bow__bow', 'title_bow__feast', 'title_bow__grapes', 'title_bow__his',
'title_bow__how', 'title_bow__last', 'title_bow__learned', 'title_bow__moveable',
'title_bow__of', 'title_bow__the', 'title_bow__trick', 'title_bow__watson',
'title_bow__wrath']

>>> column_trans.transform(X).toarray()
...
array([[1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
       [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0],
       [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
       [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1]]...)
```
我们可以通过设置remainder='passthrough'来保留其余的ranking列。这些值被附加到转换的末尾:

``` python
>>> column_trans = ColumnTransformer(
...     [('city_category', OneHotEncoder(dtype='int'),['city']),
...      ('title_bow', CountVectorizer(), 'title')],
...     remainder='passthrough')

>>> column_trans.fit_transform(X)
...
array([[1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 5, 4],
       [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 3, 5],
       [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 4, 4],
       [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 5, 3]]...)
```

可以将remainder设置为estimator来转换剩余的ranking列。转换后的值被附加到转换的末尾:

``` python
>>> from sklearn.preprocessing import MinMaxScaler
>>> column_trans = ColumnTransformer(
...     [('city_category', OneHotEncoder(), ['city']),
...      ('title_bow', CountVectorizer(), 'title')],
...     remainder=MinMaxScaler())

>>> column_trans.fit_transform(X)[:, -2:]
...
array([[1. , 0.5],
       [0. , 1. ],
       [0.5, 0.5],
       [1. , 0. ]])
```

## 自定义转换器样例

``` python

import pandas as pd
import numpy as np
from sklearn.base import BaseEstimator, TransformerMixin
 
class DropColumns(BaseEstimator, TransformerMixin):
    def __init__(self, drop_list):
        self.drop_list = drop_list 
 
    def fit(self, X, y=None):
        return self 
 
    def transform(self, X, y=None):
        useful_columns = [x for x in list(X.columns) if (x not in self.drop_list)]
        df = X[useful_columns].copy()
        return df
```

# Reference
https://sklearn.apachecn.org/docs/master/38.html
https://blog.csdn.net/qq_15111861/article/details/95871335