<html>

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=0.5,minimum-scale=1.0,user-scalable=0" />
    <meta name="format-detection" content="telephone=no, email=no" />
    <title>结果</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>

<body>
    <div style="display: none">
        <div id='zeroCount'>{{articleType.typeA}}</div>
        <div id='oneToTen'>{{articleType.typeB}}</div>
        <div id='elToTwo'>{{articleType.typeC}}</div>
        <div id='beyondTwo'>{{articleType.typeD}}</div>
    </div>
    <div class="container">
        <h2>简书程序员专题热门文章900篇代码块统计</h2>
        <div id="chart" class="chart"></div>
        <table>
            <thead>
                <tr>
                    <th>文章名</th>
                    <th>代码块数量</th>
                    <th>阅读量</th>
                </tr>
            </thead>
            <tbody>
                {% for item in articles %}
                    <tr>
                        <td>
                        <a href={{item.url}}>
                        {{ item.title }}</td>
                        </a>
                    <td>{{ item.codes }}</td>
                    <td>{{ item.viewsCount }}</td>
                    </tr>
                {% endfor %}
            </tbody>
        </table>
    </div>
    <script type="text/javascript" src="js/echarts.common.min.js"></script>
    <script type="text/javascript" src="js/script.js"></script>
</body>
</html>