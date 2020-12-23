/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 51477.0, "minX": 0.0, "maxY": 56794.0, "series": [{"data": [[0.0, 51477.0], [0.1, 51477.0], [0.2, 51477.0], [0.3, 51477.0], [0.4, 51477.0], [0.5, 51477.0], [0.6, 51477.0], [0.7, 51477.0], [0.8, 51477.0], [0.9, 51477.0], [1.0, 51477.0], [1.1, 51477.0], [1.2, 51477.0], [1.3, 51477.0], [1.4, 51477.0], [1.5, 51477.0], [1.6, 51477.0], [1.7, 51477.0], [1.8, 51477.0], [1.9, 51477.0], [2.0, 51784.0], [2.1, 51784.0], [2.2, 51784.0], [2.3, 51784.0], [2.4, 51784.0], [2.5, 51784.0], [2.6, 51784.0], [2.7, 51784.0], [2.8, 51784.0], [2.9, 51784.0], [3.0, 51784.0], [3.1, 51784.0], [3.2, 51784.0], [3.3, 51784.0], [3.4, 51784.0], [3.5, 51784.0], [3.6, 51784.0], [3.7, 51784.0], [3.8, 51784.0], [3.9, 51784.0], [4.0, 51946.0], [4.1, 51946.0], [4.2, 51946.0], [4.3, 51946.0], [4.4, 51946.0], [4.5, 51946.0], [4.6, 51946.0], [4.7, 51946.0], [4.8, 51946.0], [4.9, 51946.0], [5.0, 51946.0], [5.1, 51946.0], [5.2, 51946.0], [5.3, 51946.0], [5.4, 51946.0], [5.5, 51946.0], [5.6, 51946.0], [5.7, 51946.0], [5.8, 51946.0], [5.9, 51946.0], [6.0, 52052.0], [6.1, 52052.0], [6.2, 52052.0], [6.3, 52052.0], [6.4, 52052.0], [6.5, 52052.0], [6.6, 52052.0], [6.7, 52052.0], [6.8, 52052.0], [6.9, 52052.0], [7.0, 52052.0], [7.1, 52052.0], [7.2, 52052.0], [7.3, 52052.0], [7.4, 52052.0], [7.5, 52052.0], [7.6, 52052.0], [7.7, 52052.0], [7.8, 52052.0], [7.9, 52052.0], [8.0, 52273.0], [8.1, 52273.0], [8.2, 52273.0], [8.3, 52273.0], [8.4, 52273.0], [8.5, 52273.0], [8.6, 52273.0], [8.7, 52273.0], [8.8, 52273.0], [8.9, 52273.0], [9.0, 52273.0], [9.1, 52273.0], [9.2, 52273.0], [9.3, 52273.0], [9.4, 52273.0], [9.5, 52273.0], [9.6, 52273.0], [9.7, 52273.0], [9.8, 52273.0], [9.9, 52273.0], [10.0, 52362.0], [10.1, 52362.0], [10.2, 52362.0], [10.3, 52362.0], [10.4, 52362.0], [10.5, 52362.0], [10.6, 52362.0], [10.7, 52362.0], [10.8, 52362.0], [10.9, 52362.0], [11.0, 52362.0], [11.1, 52362.0], [11.2, 52362.0], [11.3, 52362.0], [11.4, 52362.0], [11.5, 52362.0], [11.6, 52362.0], [11.7, 52362.0], [11.8, 52362.0], [11.9, 52362.0], [12.0, 52383.0], [12.1, 52383.0], [12.2, 52383.0], [12.3, 52383.0], [12.4, 52383.0], [12.5, 52383.0], [12.6, 52383.0], [12.7, 52383.0], [12.8, 52383.0], [12.9, 52383.0], [13.0, 52383.0], [13.1, 52383.0], [13.2, 52383.0], [13.3, 52383.0], [13.4, 52383.0], [13.5, 52383.0], [13.6, 52383.0], [13.7, 52383.0], [13.8, 52383.0], [13.9, 52383.0], [14.0, 52603.0], [14.1, 52603.0], [14.2, 52603.0], [14.3, 52603.0], [14.4, 52603.0], [14.5, 52603.0], [14.6, 52603.0], [14.7, 52603.0], [14.8, 52603.0], [14.9, 52603.0], [15.0, 52603.0], [15.1, 52603.0], [15.2, 52603.0], [15.3, 52603.0], [15.4, 52603.0], [15.5, 52603.0], [15.6, 52603.0], [15.7, 52603.0], [15.8, 52603.0], [15.9, 52603.0], [16.0, 52772.0], [16.1, 52772.0], [16.2, 52772.0], [16.3, 52772.0], [16.4, 52772.0], [16.5, 52772.0], [16.6, 52772.0], [16.7, 52772.0], [16.8, 52772.0], [16.9, 52772.0], [17.0, 52772.0], [17.1, 52772.0], [17.2, 52772.0], [17.3, 52772.0], [17.4, 52772.0], [17.5, 52772.0], [17.6, 52772.0], [17.7, 52772.0], [17.8, 52772.0], [17.9, 52772.0], [18.0, 52916.0], [18.1, 52916.0], [18.2, 52916.0], [18.3, 52916.0], [18.4, 52916.0], [18.5, 52916.0], [18.6, 52916.0], [18.7, 52916.0], [18.8, 52916.0], [18.9, 52916.0], [19.0, 52916.0], [19.1, 52916.0], [19.2, 52916.0], [19.3, 52916.0], [19.4, 52916.0], [19.5, 52916.0], [19.6, 52916.0], [19.7, 52916.0], [19.8, 52916.0], [19.9, 52916.0], [20.0, 52930.0], [20.1, 52930.0], [20.2, 52930.0], [20.3, 52930.0], [20.4, 52930.0], [20.5, 52930.0], [20.6, 52930.0], [20.7, 52930.0], [20.8, 52930.0], [20.9, 52930.0], [21.0, 52930.0], [21.1, 52930.0], [21.2, 52930.0], [21.3, 52930.0], [21.4, 52930.0], [21.5, 52930.0], [21.6, 52930.0], [21.7, 52930.0], [21.8, 52930.0], [21.9, 52930.0], [22.0, 52950.0], [22.1, 52950.0], [22.2, 52950.0], [22.3, 52950.0], [22.4, 52950.0], [22.5, 52950.0], [22.6, 52950.0], [22.7, 52950.0], [22.8, 52950.0], [22.9, 52950.0], [23.0, 52950.0], [23.1, 52950.0], [23.2, 52950.0], [23.3, 52950.0], [23.4, 52950.0], [23.5, 52950.0], [23.6, 52950.0], [23.7, 52950.0], [23.8, 52950.0], [23.9, 52950.0], [24.0, 53254.0], [24.1, 53254.0], [24.2, 53254.0], [24.3, 53254.0], [24.4, 53254.0], [24.5, 53254.0], [24.6, 53254.0], [24.7, 53254.0], [24.8, 53254.0], [24.9, 53254.0], [25.0, 53254.0], [25.1, 53254.0], [25.2, 53254.0], [25.3, 53254.0], [25.4, 53254.0], [25.5, 53254.0], [25.6, 53254.0], [25.7, 53254.0], [25.8, 53254.0], [25.9, 53254.0], [26.0, 53320.0], [26.1, 53320.0], [26.2, 53320.0], [26.3, 53320.0], [26.4, 53320.0], [26.5, 53320.0], [26.6, 53320.0], [26.7, 53320.0], [26.8, 53320.0], [26.9, 53320.0], [27.0, 53320.0], [27.1, 53320.0], [27.2, 53320.0], [27.3, 53320.0], [27.4, 53320.0], [27.5, 53320.0], [27.6, 53320.0], [27.7, 53320.0], [27.8, 53320.0], [27.9, 53320.0], [28.0, 53472.0], [28.1, 53472.0], [28.2, 53472.0], [28.3, 53472.0], [28.4, 53472.0], [28.5, 53472.0], [28.6, 53472.0], [28.7, 53472.0], [28.8, 53472.0], [28.9, 53472.0], [29.0, 53472.0], [29.1, 53472.0], [29.2, 53472.0], [29.3, 53472.0], [29.4, 53472.0], [29.5, 53472.0], [29.6, 53472.0], [29.7, 53472.0], [29.8, 53472.0], [29.9, 53472.0], [30.0, 53544.0], [30.1, 53544.0], [30.2, 53544.0], [30.3, 53544.0], [30.4, 53544.0], [30.5, 53544.0], [30.6, 53544.0], [30.7, 53544.0], [30.8, 53544.0], [30.9, 53544.0], [31.0, 53544.0], [31.1, 53544.0], [31.2, 53544.0], [31.3, 53544.0], [31.4, 53544.0], [31.5, 53544.0], [31.6, 53544.0], [31.7, 53544.0], [31.8, 53544.0], [31.9, 53544.0], [32.0, 53569.0], [32.1, 53569.0], [32.2, 53569.0], [32.3, 53569.0], [32.4, 53569.0], [32.5, 53569.0], [32.6, 53569.0], [32.7, 53569.0], [32.8, 53569.0], [32.9, 53569.0], [33.0, 53569.0], [33.1, 53569.0], [33.2, 53569.0], [33.3, 53569.0], [33.4, 53569.0], [33.5, 53569.0], [33.6, 53569.0], [33.7, 53569.0], [33.8, 53569.0], [33.9, 53569.0], [34.0, 53823.0], [34.1, 53823.0], [34.2, 53823.0], [34.3, 53823.0], [34.4, 53823.0], [34.5, 53823.0], [34.6, 53823.0], [34.7, 53823.0], [34.8, 53823.0], [34.9, 53823.0], [35.0, 53823.0], [35.1, 53823.0], [35.2, 53823.0], [35.3, 53823.0], [35.4, 53823.0], [35.5, 53823.0], [35.6, 53823.0], [35.7, 53823.0], [35.8, 53823.0], [35.9, 53823.0], [36.0, 54068.0], [36.1, 54068.0], [36.2, 54068.0], [36.3, 54068.0], [36.4, 54068.0], [36.5, 54068.0], [36.6, 54068.0], [36.7, 54068.0], [36.8, 54068.0], [36.9, 54068.0], [37.0, 54068.0], [37.1, 54068.0], [37.2, 54068.0], [37.3, 54068.0], [37.4, 54068.0], [37.5, 54068.0], [37.6, 54068.0], [37.7, 54068.0], [37.8, 54068.0], [37.9, 54068.0], [38.0, 54212.0], [38.1, 54212.0], [38.2, 54212.0], [38.3, 54212.0], [38.4, 54212.0], [38.5, 54212.0], [38.6, 54212.0], [38.7, 54212.0], [38.8, 54212.0], [38.9, 54212.0], [39.0, 54212.0], [39.1, 54212.0], [39.2, 54212.0], [39.3, 54212.0], [39.4, 54212.0], [39.5, 54212.0], [39.6, 54212.0], [39.7, 54212.0], [39.8, 54212.0], [39.9, 54212.0], [40.0, 54252.0], [40.1, 54252.0], [40.2, 54252.0], [40.3, 54252.0], [40.4, 54252.0], [40.5, 54252.0], [40.6, 54252.0], [40.7, 54252.0], [40.8, 54252.0], [40.9, 54252.0], [41.0, 54252.0], [41.1, 54252.0], [41.2, 54252.0], [41.3, 54252.0], [41.4, 54252.0], [41.5, 54252.0], [41.6, 54252.0], [41.7, 54252.0], [41.8, 54252.0], [41.9, 54252.0], [42.0, 54267.0], [42.1, 54267.0], [42.2, 54267.0], [42.3, 54267.0], [42.4, 54267.0], [42.5, 54267.0], [42.6, 54267.0], [42.7, 54267.0], [42.8, 54267.0], [42.9, 54267.0], [43.0, 54267.0], [43.1, 54267.0], [43.2, 54267.0], [43.3, 54267.0], [43.4, 54267.0], [43.5, 54267.0], [43.6, 54267.0], [43.7, 54267.0], [43.8, 54267.0], [43.9, 54267.0], [44.0, 54307.0], [44.1, 54307.0], [44.2, 54307.0], [44.3, 54307.0], [44.4, 54307.0], [44.5, 54307.0], [44.6, 54307.0], [44.7, 54307.0], [44.8, 54307.0], [44.9, 54307.0], [45.0, 54307.0], [45.1, 54307.0], [45.2, 54307.0], [45.3, 54307.0], [45.4, 54307.0], [45.5, 54307.0], [45.6, 54307.0], [45.7, 54307.0], [45.8, 54307.0], [45.9, 54307.0], [46.0, 54615.0], [46.1, 54615.0], [46.2, 54615.0], [46.3, 54615.0], [46.4, 54615.0], [46.5, 54615.0], [46.6, 54615.0], [46.7, 54615.0], [46.8, 54615.0], [46.9, 54615.0], [47.0, 54615.0], [47.1, 54615.0], [47.2, 54615.0], [47.3, 54615.0], [47.4, 54615.0], [47.5, 54615.0], [47.6, 54615.0], [47.7, 54615.0], [47.8, 54615.0], [47.9, 54615.0], [48.0, 54932.0], [48.1, 54932.0], [48.2, 54932.0], [48.3, 54932.0], [48.4, 54932.0], [48.5, 54932.0], [48.6, 54932.0], [48.7, 54932.0], [48.8, 54932.0], [48.9, 54932.0], [49.0, 54932.0], [49.1, 54932.0], [49.2, 54932.0], [49.3, 54932.0], [49.4, 54932.0], [49.5, 54932.0], [49.6, 54932.0], [49.7, 54932.0], [49.8, 54932.0], [49.9, 54932.0], [50.0, 55117.0], [50.1, 55117.0], [50.2, 55117.0], [50.3, 55117.0], [50.4, 55117.0], [50.5, 55117.0], [50.6, 55117.0], [50.7, 55117.0], [50.8, 55117.0], [50.9, 55117.0], [51.0, 55117.0], [51.1, 55117.0], [51.2, 55117.0], [51.3, 55117.0], [51.4, 55117.0], [51.5, 55117.0], [51.6, 55117.0], [51.7, 55117.0], [51.8, 55117.0], [51.9, 55117.0], [52.0, 55307.0], [52.1, 55307.0], [52.2, 55307.0], [52.3, 55307.0], [52.4, 55307.0], [52.5, 55307.0], [52.6, 55307.0], [52.7, 55307.0], [52.8, 55307.0], [52.9, 55307.0], [53.0, 55307.0], [53.1, 55307.0], [53.2, 55307.0], [53.3, 55307.0], [53.4, 55307.0], [53.5, 55307.0], [53.6, 55307.0], [53.7, 55307.0], [53.8, 55307.0], [53.9, 55307.0], [54.0, 55587.0], [54.1, 55587.0], [54.2, 55587.0], [54.3, 55587.0], [54.4, 55587.0], [54.5, 55587.0], [54.6, 55587.0], [54.7, 55587.0], [54.8, 55587.0], [54.9, 55587.0], [55.0, 55587.0], [55.1, 55587.0], [55.2, 55587.0], [55.3, 55587.0], [55.4, 55587.0], [55.5, 55587.0], [55.6, 55587.0], [55.7, 55587.0], [55.8, 55587.0], [55.9, 55587.0], [56.0, 55627.0], [56.1, 55627.0], [56.2, 55627.0], [56.3, 55627.0], [56.4, 55627.0], [56.5, 55627.0], [56.6, 55627.0], [56.7, 55627.0], [56.8, 55627.0], [56.9, 55627.0], [57.0, 55627.0], [57.1, 55627.0], [57.2, 55627.0], [57.3, 55627.0], [57.4, 55627.0], [57.5, 55627.0], [57.6, 55627.0], [57.7, 55627.0], [57.8, 55627.0], [57.9, 55627.0], [58.0, 55766.0], [58.1, 55766.0], [58.2, 55766.0], [58.3, 55766.0], [58.4, 55766.0], [58.5, 55766.0], [58.6, 55766.0], [58.7, 55766.0], [58.8, 55766.0], [58.9, 55766.0], [59.0, 55766.0], [59.1, 55766.0], [59.2, 55766.0], [59.3, 55766.0], [59.4, 55766.0], [59.5, 55766.0], [59.6, 55766.0], [59.7, 55766.0], [59.8, 55766.0], [59.9, 55766.0], [60.0, 55780.0], [60.1, 55780.0], [60.2, 55780.0], [60.3, 55780.0], [60.4, 55780.0], [60.5, 55780.0], [60.6, 55780.0], [60.7, 55780.0], [60.8, 55780.0], [60.9, 55780.0], [61.0, 55780.0], [61.1, 55780.0], [61.2, 55780.0], [61.3, 55780.0], [61.4, 55780.0], [61.5, 55780.0], [61.6, 55780.0], [61.7, 55780.0], [61.8, 55780.0], [61.9, 55780.0], [62.0, 55826.0], [62.1, 55826.0], [62.2, 55826.0], [62.3, 55826.0], [62.4, 55826.0], [62.5, 55826.0], [62.6, 55826.0], [62.7, 55826.0], [62.8, 55826.0], [62.9, 55826.0], [63.0, 55826.0], [63.1, 55826.0], [63.2, 55826.0], [63.3, 55826.0], [63.4, 55826.0], [63.5, 55826.0], [63.6, 55826.0], [63.7, 55826.0], [63.8, 55826.0], [63.9, 55826.0], [64.0, 55871.0], [64.1, 55871.0], [64.2, 55871.0], [64.3, 55871.0], [64.4, 55871.0], [64.5, 55871.0], [64.6, 55871.0], [64.7, 55871.0], [64.8, 55871.0], [64.9, 55871.0], [65.0, 55871.0], [65.1, 55871.0], [65.2, 55871.0], [65.3, 55871.0], [65.4, 55871.0], [65.5, 55871.0], [65.6, 55871.0], [65.7, 55871.0], [65.8, 55871.0], [65.9, 55871.0], [66.0, 55940.0], [66.1, 55940.0], [66.2, 55940.0], [66.3, 55940.0], [66.4, 55940.0], [66.5, 55940.0], [66.6, 55940.0], [66.7, 55940.0], [66.8, 55940.0], [66.9, 55940.0], [67.0, 55940.0], [67.1, 55940.0], [67.2, 55940.0], [67.3, 55940.0], [67.4, 55940.0], [67.5, 55940.0], [67.6, 55940.0], [67.7, 55940.0], [67.8, 55940.0], [67.9, 55940.0], [68.0, 56041.0], [68.1, 56041.0], [68.2, 56041.0], [68.3, 56041.0], [68.4, 56041.0], [68.5, 56041.0], [68.6, 56041.0], [68.7, 56041.0], [68.8, 56041.0], [68.9, 56041.0], [69.0, 56041.0], [69.1, 56041.0], [69.2, 56041.0], [69.3, 56041.0], [69.4, 56041.0], [69.5, 56041.0], [69.6, 56041.0], [69.7, 56041.0], [69.8, 56041.0], [69.9, 56041.0], [70.0, 56094.0], [70.1, 56094.0], [70.2, 56094.0], [70.3, 56094.0], [70.4, 56094.0], [70.5, 56094.0], [70.6, 56094.0], [70.7, 56094.0], [70.8, 56094.0], [70.9, 56094.0], [71.0, 56094.0], [71.1, 56094.0], [71.2, 56094.0], [71.3, 56094.0], [71.4, 56094.0], [71.5, 56094.0], [71.6, 56094.0], [71.7, 56094.0], [71.8, 56094.0], [71.9, 56094.0], [72.0, 56099.0], [72.1, 56099.0], [72.2, 56099.0], [72.3, 56099.0], [72.4, 56099.0], [72.5, 56099.0], [72.6, 56099.0], [72.7, 56099.0], [72.8, 56099.0], [72.9, 56099.0], [73.0, 56099.0], [73.1, 56099.0], [73.2, 56099.0], [73.3, 56099.0], [73.4, 56099.0], [73.5, 56099.0], [73.6, 56099.0], [73.7, 56099.0], [73.8, 56099.0], [73.9, 56099.0], [74.0, 56130.0], [74.1, 56130.0], [74.2, 56130.0], [74.3, 56130.0], [74.4, 56130.0], [74.5, 56130.0], [74.6, 56130.0], [74.7, 56130.0], [74.8, 56130.0], [74.9, 56130.0], [75.0, 56130.0], [75.1, 56130.0], [75.2, 56130.0], [75.3, 56130.0], [75.4, 56130.0], [75.5, 56130.0], [75.6, 56130.0], [75.7, 56130.0], [75.8, 56130.0], [75.9, 56130.0], [76.0, 56144.0], [76.1, 56144.0], [76.2, 56144.0], [76.3, 56144.0], [76.4, 56144.0], [76.5, 56144.0], [76.6, 56144.0], [76.7, 56144.0], [76.8, 56144.0], [76.9, 56144.0], [77.0, 56144.0], [77.1, 56144.0], [77.2, 56144.0], [77.3, 56144.0], [77.4, 56144.0], [77.5, 56144.0], [77.6, 56144.0], [77.7, 56144.0], [77.8, 56144.0], [77.9, 56144.0], [78.0, 56188.0], [78.1, 56188.0], [78.2, 56188.0], [78.3, 56188.0], [78.4, 56188.0], [78.5, 56188.0], [78.6, 56188.0], [78.7, 56188.0], [78.8, 56188.0], [78.9, 56188.0], [79.0, 56188.0], [79.1, 56188.0], [79.2, 56188.0], [79.3, 56188.0], [79.4, 56188.0], [79.5, 56188.0], [79.6, 56188.0], [79.7, 56188.0], [79.8, 56188.0], [79.9, 56188.0], [80.0, 56286.0], [80.1, 56286.0], [80.2, 56286.0], [80.3, 56286.0], [80.4, 56286.0], [80.5, 56286.0], [80.6, 56286.0], [80.7, 56286.0], [80.8, 56286.0], [80.9, 56286.0], [81.0, 56286.0], [81.1, 56286.0], [81.2, 56286.0], [81.3, 56286.0], [81.4, 56286.0], [81.5, 56286.0], [81.6, 56286.0], [81.7, 56286.0], [81.8, 56286.0], [81.9, 56286.0], [82.0, 56370.0], [82.1, 56370.0], [82.2, 56370.0], [82.3, 56370.0], [82.4, 56370.0], [82.5, 56370.0], [82.6, 56370.0], [82.7, 56370.0], [82.8, 56370.0], [82.9, 56370.0], [83.0, 56370.0], [83.1, 56370.0], [83.2, 56370.0], [83.3, 56370.0], [83.4, 56370.0], [83.5, 56370.0], [83.6, 56370.0], [83.7, 56370.0], [83.8, 56370.0], [83.9, 56370.0], [84.0, 56384.0], [84.1, 56384.0], [84.2, 56384.0], [84.3, 56384.0], [84.4, 56384.0], [84.5, 56384.0], [84.6, 56384.0], [84.7, 56384.0], [84.8, 56384.0], [84.9, 56384.0], [85.0, 56384.0], [85.1, 56384.0], [85.2, 56384.0], [85.3, 56384.0], [85.4, 56384.0], [85.5, 56384.0], [85.6, 56384.0], [85.7, 56384.0], [85.8, 56384.0], [85.9, 56384.0], [86.0, 56419.0], [86.1, 56419.0], [86.2, 56419.0], [86.3, 56419.0], [86.4, 56419.0], [86.5, 56419.0], [86.6, 56419.0], [86.7, 56419.0], [86.8, 56419.0], [86.9, 56419.0], [87.0, 56419.0], [87.1, 56419.0], [87.2, 56419.0], [87.3, 56419.0], [87.4, 56419.0], [87.5, 56419.0], [87.6, 56419.0], [87.7, 56419.0], [87.8, 56419.0], [87.9, 56419.0], [88.0, 56425.0], [88.1, 56425.0], [88.2, 56425.0], [88.3, 56425.0], [88.4, 56425.0], [88.5, 56425.0], [88.6, 56425.0], [88.7, 56425.0], [88.8, 56425.0], [88.9, 56425.0], [89.0, 56425.0], [89.1, 56425.0], [89.2, 56425.0], [89.3, 56425.0], [89.4, 56425.0], [89.5, 56425.0], [89.6, 56425.0], [89.7, 56425.0], [89.8, 56425.0], [89.9, 56425.0], [90.0, 56469.0], [90.1, 56469.0], [90.2, 56469.0], [90.3, 56469.0], [90.4, 56469.0], [90.5, 56469.0], [90.6, 56469.0], [90.7, 56469.0], [90.8, 56469.0], [90.9, 56469.0], [91.0, 56469.0], [91.1, 56469.0], [91.2, 56469.0], [91.3, 56469.0], [91.4, 56469.0], [91.5, 56469.0], [91.6, 56469.0], [91.7, 56469.0], [91.8, 56469.0], [91.9, 56469.0], [92.0, 56498.0], [92.1, 56498.0], [92.2, 56498.0], [92.3, 56498.0], [92.4, 56498.0], [92.5, 56498.0], [92.6, 56498.0], [92.7, 56498.0], [92.8, 56498.0], [92.9, 56498.0], [93.0, 56498.0], [93.1, 56498.0], [93.2, 56498.0], [93.3, 56498.0], [93.4, 56498.0], [93.5, 56498.0], [93.6, 56498.0], [93.7, 56498.0], [93.8, 56498.0], [93.9, 56498.0], [94.0, 56551.0], [94.1, 56551.0], [94.2, 56551.0], [94.3, 56551.0], [94.4, 56551.0], [94.5, 56551.0], [94.6, 56551.0], [94.7, 56551.0], [94.8, 56551.0], [94.9, 56551.0], [95.0, 56551.0], [95.1, 56551.0], [95.2, 56551.0], [95.3, 56551.0], [95.4, 56551.0], [95.5, 56551.0], [95.6, 56551.0], [95.7, 56551.0], [95.8, 56551.0], [95.9, 56551.0], [96.0, 56632.0], [96.1, 56632.0], [96.2, 56632.0], [96.3, 56632.0], [96.4, 56632.0], [96.5, 56632.0], [96.6, 56632.0], [96.7, 56632.0], [96.8, 56632.0], [96.9, 56632.0], [97.0, 56632.0], [97.1, 56632.0], [97.2, 56632.0], [97.3, 56632.0], [97.4, 56632.0], [97.5, 56632.0], [97.6, 56632.0], [97.7, 56632.0], [97.8, 56632.0], [97.9, 56632.0], [98.0, 56794.0], [98.1, 56794.0], [98.2, 56794.0], [98.3, 56794.0], [98.4, 56794.0], [98.5, 56794.0], [98.6, 56794.0], [98.7, 56794.0], [98.8, 56794.0], [98.9, 56794.0], [99.0, 56794.0], [99.1, 56794.0], [99.2, 56794.0], [99.3, 56794.0], [99.4, 56794.0], [99.5, 56794.0], [99.6, 56794.0], [99.7, 56794.0], [99.8, 56794.0], [99.9, 56794.0]], "isOverall": false, "label": "HTTP请求", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 51400.0, "maxY": 4.0, "series": [{"data": [[51400.0, 1.0], [51700.0, 1.0], [51900.0, 1.0], [52000.0, 1.0], [52200.0, 1.0], [52300.0, 2.0], [52700.0, 1.0], [52600.0, 1.0], [52900.0, 3.0], [53200.0, 1.0], [53400.0, 1.0], [53300.0, 1.0], [53500.0, 2.0], [53800.0, 1.0], [54200.0, 3.0], [54000.0, 1.0], [54300.0, 1.0], [54600.0, 1.0], [54900.0, 1.0], [55100.0, 1.0], [55500.0, 1.0], [55700.0, 2.0], [55300.0, 1.0], [55600.0, 1.0], [55900.0, 1.0], [55800.0, 2.0], [56400.0, 4.0], [56500.0, 1.0], [56600.0, 1.0], [56700.0, 1.0], [56100.0, 3.0], [56000.0, 3.0], [56200.0, 1.0], [56300.0, 2.0]], "isOverall": false, "label": "HTTP请求", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 56700.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 50.0, "minX": 2.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 50.0, "series": [{"data": [], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 50.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 25.5, "minX": 1.60862754E12, "maxY": 25.5, "series": [{"data": [[1.60862754E12, 25.5]], "isOverall": false, "label": "线程组", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.60862754E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 51477.0, "minX": 1.0, "maxY": 56794.0, "series": [{"data": [[2.0, 56632.0], [3.0, 56419.0], [4.0, 56498.0], [5.0, 56469.0], [6.0, 56370.0], [7.0, 56551.0], [8.0, 56384.0], [9.0, 56188.0], [10.0, 56425.0], [11.0, 56286.0], [12.0, 56130.0], [13.0, 56099.0], [14.0, 56041.0], [15.0, 56094.0], [16.0, 55826.0], [17.0, 56144.0], [18.0, 55871.0], [19.0, 55780.0], [20.0, 55940.0], [21.0, 55627.0], [22.0, 55307.0], [23.0, 55766.0], [24.0, 55117.0], [25.0, 55587.0], [26.0, 54932.0], [27.0, 54267.0], [28.0, 54615.0], [29.0, 54252.0], [30.0, 54307.0], [31.0, 54068.0], [33.0, 53823.0], [32.0, 54212.0], [35.0, 53544.0], [34.0, 53472.0], [37.0, 53320.0], [36.0, 53569.0], [39.0, 52916.0], [38.0, 53254.0], [41.0, 52950.0], [40.0, 52930.0], [43.0, 52772.0], [42.0, 52603.0], [45.0, 52383.0], [44.0, 52362.0], [47.0, 52052.0], [46.0, 52273.0], [49.0, 51784.0], [48.0, 51946.0], [50.0, 51477.0], [1.0, 56794.0]], "isOverall": false, "label": "HTTP请求", "isController": false}, {"data": [[25.5, 54648.560000000005]], "isOverall": false, "label": "HTTP请求-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 50.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 147.5, "minX": 1.60862754E12, "maxY": 2965.8333333333335, "series": [{"data": [[1.60862754E12, 147.5]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.60862754E12, 2965.8333333333335]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.60862754E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 54648.560000000005, "minX": 1.60862754E12, "maxY": 54648.560000000005, "series": [{"data": [[1.60862754E12, 54648.560000000005]], "isOverall": false, "label": "HTTP请求", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.60862754E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 54648.40000000002, "minX": 1.60862754E12, "maxY": 54648.40000000002, "series": [{"data": [[1.60862754E12, 54648.40000000002]], "isOverall": false, "label": "HTTP请求", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.60862754E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 1.9600000000000009, "minX": 1.60862754E12, "maxY": 1.9600000000000009, "series": [{"data": [[1.60862754E12, 1.9600000000000009]], "isOverall": false, "label": "HTTP请求", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.60862754E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 51477.0, "minX": 1.60862754E12, "maxY": 56794.0, "series": [{"data": [[1.60862754E12, 56794.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.60862754E12, 56464.6]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.60862754E12, 56794.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.60862754E12, 56587.45]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.60862754E12, 51477.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.60862754E12, 55024.5]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.60862754E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 53102.0, "minX": 2.0, "maxY": 56713.0, "series": [{"data": [[2.0, 56713.0], [18.0, 56166.0], [5.0, 53695.0], [6.0, 54287.0], [7.0, 53102.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 18.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 53102.0, "minX": 2.0, "maxY": 56713.0, "series": [{"data": [[2.0, 56713.0], [18.0, 56166.0], [5.0, 53695.0], [6.0, 54287.0], [7.0, 53102.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 18.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.8333333333333334, "minX": 1.60862748E12, "maxY": 0.8333333333333334, "series": [{"data": [[1.60862748E12, 0.8333333333333334]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.60862748E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.8333333333333334, "minX": 1.60862754E12, "maxY": 0.8333333333333334, "series": [{"data": [[1.60862754E12, 0.8333333333333334]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.60862754E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.8333333333333334, "minX": 1.60862754E12, "maxY": 0.8333333333333334, "series": [{"data": [[1.60862754E12, 0.8333333333333334]], "isOverall": false, "label": "HTTP请求-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.60862754E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.8333333333333334, "minX": 1.60862754E12, "maxY": 0.8333333333333334, "series": [{"data": [[1.60862754E12, 0.8333333333333334]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.60862754E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 28800000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

