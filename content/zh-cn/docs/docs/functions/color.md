颜色功能
===============

**bar（x，宽度）** -\> varchar（横坐标）

使用默认的`low_color`（红色）和`high_color`（绿色）在ANSI条形图中绘制单个条形图。例如，将25%的`x`和40的width传递给此函数。将绘制一个10个字符的红色条形图后跟30个空格，以创建一个40个字符的条形图。

**bar（x，宽度，低\_color，高\_color）** -\> varchar颜色

在指定的`width`的ANSI条形图中呈现一条线。`x`是\[0,1\]之间的双倍值。`x`不在\[0,1\]范围内的值将被截断为0或1。
`low_color`和`high_color`捕获了水平条形图两端的颜色。例如，`x`为0.5,`width`为80,`low_color`为0xFF0000,`high_color`为0x00FF00，则此函数将
返回一个40个字符的条形码，红色（0xFF0000）和黄色（0xFFFF00）的条形码不同，80个字符的其余部分将用空格填充。

![](../images/functions_color_bar.png){.align-center}


**color（字符串）** -\> color

返回一个颜色捕获解码RGB值从4个字符字符串格式\"\#000\。输入字符串应包含一个CSS样式的短rgb字符串或`black`,`red`,`green`, "黄色"，
蓝色、洋红色、青色、白色。

**颜色（x，低，高，低\_color，高\_color）** -\>颜色

使用双参数`x`、`low`和`high`返回插入`low_color`和`high_color`之间的颜色，以计算分数，然后传递给`color（分数，低色，高色）`
函数如下所示。如果`x`超出`low`和`high`定义的范围，则其值将被截断以适合此范围。

**颜色（x，低\_色，高\_色）** -\>颜色

根据0和1.0之间的双引号`x`返回在`low_color`和`high_color`之间插入的颜色。`x`是\[0,1\]之间的双倍值。`x`不在\[0,1\]范围内的值将被截断为0或1。

**渲染器（x，颜色）** -\> varchar

渲染值`x`使用ANSI颜色代码使用特定的颜色。`x`可以是double、bigint或varchar类型。

**render(b)** -\> varchar

接受boolean值`b`，并使用ANSI颜色代码渲染一个绿色的真或红色的假。

**rgb（红、绿、蓝）** -\>颜色

返回一个颜色值，该值捕获三个分量颜色值的RGB值，它们作为int参数提供，范围从0到255:`red`,`green`,`blue`。

