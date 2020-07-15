# Using JDK for Compilation
<!-- TOC -->

- [Using JDK for Compilation](#using-jdk-for-compilation)
    - [Overview](#overview)
    - [Basics](#basics)
        - [File Type and Tool](#file-type-and-tool)
        - [Java Program Generation Process](#java-program-generation-process)
        - [Common JDK Options](#common-jdk-options)
    - [Class Library](#class-library)
        - [Package Declaration](#package-declaration)
        - [Package Reference](#package-reference)
    - [Examples](#examples)
        - [Compiling a Java Program Without a Package](#compiling-a-java-program-without-a-package)
        - [Compiling a Java Program with a Package](#compiling-a-java-program-with-a-package)

<!-- /TOC -->

## Overview

A Java Development Kit \(JDK\) is a software package required for Java development. It contains the Java Runtime Environment \(JRE\) and compilation and commissioning tools. On the basis of OpenJDK, openEuler optimizes GC, enhances concurrency stability, and enhances security, improving the performance and stability of Java applications on ARM.

## Basics



### File Type and Tool

For any given input file, the file type determines which tool to use for processing. The common file types and tools are described in  [Table 1](#table634145764320)  and  [Table 2](#table103504146433).

**Table  1**  Common JDK file types

<a name="table634145764320"></a>
<table><thead align="left"><tr id="row53445724319"><th class="cellrowborder" valign="top" width="50%" id="mcps1.2.3.1.1"><p id="p134175716436"><a name="p134175716436"></a><a name="p134175716436"></a>Extension (Suffix)</p>
</th>
<th class="cellrowborder" valign="top" width="50%" id="mcps1.2.3.1.2"><p id="p3341573439"><a name="p3341573439"></a><a name="p3341573439"></a>Description</p>
</th>
</tr>
</thead>
<tbody><tr id="row2341857174311"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p143419579434"><a name="p143419579434"></a><a name="p143419579434"></a>.java</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p1634125794311"><a name="p1634125794311"></a><a name="p1634125794311"></a>Java source code file.</p>
</td>
</tr>
<tr id="row334185744314"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p134105764319"><a name="p134105764319"></a><a name="p134105764319"></a>.class</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p13425717436"><a name="p13425717436"></a><a name="p13425717436"></a>Java bytecode file, which is intermediate code irrelevant to any specific machine or OS environment. It is a binary file, which is the target code file generated after the Java source file is compiled by the Java compiler.</p>
</td>
</tr>
<tr id="row1934157104315"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p1234957124317"><a name="p1234957124317"></a><a name="p1234957124317"></a>.jar</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p234135724312"><a name="p234135724312"></a><a name="p234135724312"></a>JAR package of Java files.</p>
</td>
</tr>
</tbody>
</table>

**Table  2**  Common JDK tools

<a name="table103504146433"></a>
<table><thead align="left"><tr id="row635141416437"><th class="cellrowborder" valign="top" width="50%" id="mcps1.2.3.1.1"><p id="p2351151419430"><a name="p2351151419430"></a><a name="p2351151419430"></a>Name</p>
</th>
<th class="cellrowborder" valign="top" width="50%" id="mcps1.2.3.1.2"><p id="p123511714144311"><a name="p123511714144311"></a><a name="p123511714144311"></a>Description</p>
</th>
</tr>
</thead>
<tbody><tr id="row3351114184314"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p235131434319"><a name="p235131434319"></a><a name="p235131434319"></a>java</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p17382051105812"><a name="p17382051105812"></a><a name="p17382051105812"></a>Java running tool, which is used to run .class bytecode files or .jar files.</p>
</td>
</tr>
<tr id="row3351201464315"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p18351214144315"><a name="p18351214144315"></a><a name="p18351214144315"></a>javac</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p1035141464315"><a name="p1035141464315"></a><a name="p1035141464315"></a>Compiles Java source code files into .class bytecode files.</p>
</td>
</tr>
<tr id="row1351914134311"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p12351191464311"><a name="p12351191464311"></a><a name="p12351191464311"></a>jar</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p17351714184311"><a name="p17351714184311"></a><a name="p17351714184311"></a>Creates and manages JAR files.</p>
</td>
</tr>
</tbody>
</table>

### Java Program Generation Process

To generate a program from Java source code files and run the program using Java, compilation and run are required. 

1.  Compilation: Use the Java compiler \(javac\) to compile Java source code files \(.java files\) into .class bytecode files.
2.  Run: Execute the bytecode files on the Java virtual machine \(JVM\).

### Common JDK Options

#### Javac Compilation Options

The command format for javac compilation is as follows:  **javac**  \[_options_\] \[_sourcefiles_\] \[_classes_\] \[@_argfiles_\]

In the preceding information:

_options_: command options.

_sourcefiles_: one or more source files to be compiled.

_classes_: one or more classes to be processed as comments.

@_argfiles_: one or more files that list options and source files. The  **-J**  option is not allowed in these files.

Javac is a Java compiler. It has many  _options_, but most of them are not commonly used.  [Table 3](#table1342946175212)  describes the common options values. 

**Table  3**  Common javac options

<a name="table1342946175212"></a>
<table><thead align="left"><tr id="row1242184611523"><th class="cellrowborder" valign="top" width="33.33333333333333%" id="mcps1.2.4.1.1"><p id="p1142134616527"><a name="p1142134616527"></a><a name="p1142134616527"></a><em id="i196115187577"><a name="i196115187577"></a><a name="i196115187577"></a>options</em> Value</p>
</th>
<th class="cellrowborder" valign="top" width="33.33333333333333%" id="mcps1.2.4.1.2"><p id="p174244605210"><a name="p174244605210"></a><a name="p174244605210"></a>Description</p>
</th>
<th class="cellrowborder" valign="top" width="33.33333333333333%" id="mcps1.2.4.1.3"><p id="p442204645214"><a name="p442204645214"></a><a name="p442204645214"></a>Example</p>
</th>
</tr>
</thead>
<tbody><tr id="row1642124685214"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p44294645211"><a name="p44294645211"></a><a name="p44294645211"></a>-d <em id="i20380213283"><a name="i20380213283"></a><a name="i20380213283"></a>path</em></p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p34284619521"><a name="p34284619521"></a><a name="p34284619521"></a>Path for storing the generated class files.</p>
<p id="p5504192417282"><a name="p5504192417282"></a><a name="p5504192417282"></a>By default, the class files generated after compilation are in the same path as the source file. You can use the <strong id="b658382612820"><a name="b658382612820"></a><a name="b658382612820"></a>-d</strong> option to export the class files to the specified path.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p14019112140"><a name="p14019112140"></a><a name="p14019112140"></a># Use the <strong id="b134171432286"><a name="b134171432286"></a><a name="b134171432286"></a>-d</strong> option to export all class files to the <strong id="b1473920366819"><a name="b1473920366819"></a><a name="b1473920366819"></a>bin</strong> directory.</p>
<p id="p1942746165211"><a name="p1942746165211"></a><a name="p1942746165211"></a>javac /src/*.java -d /bin</p>
</td>
</tr>
<tr id="row375616513198"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p8756125113199"><a name="p8756125113199"></a><a name="p8756125113199"></a>-s <em id="i764464192010"><a name="i764464192010"></a><a name="i764464192010"></a>path</em></p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p1475675181912"><a name="p1475675181912"></a><a name="p1475675181912"></a>Path for storing the generated source files.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p275614511197"><a name="p275614511197"></a><a name="p275614511197"></a>-</p>
</td>
</tr>
<tr id="row3421646125214"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p24254614529"><a name="p24254614529"></a><a name="p24254614529"></a>-cp <em id="i457411173112"><a name="i457411173112"></a><a name="i457411173112"></a>path</em> or -classpath <em id="i778195173018"><a name="i778195173018"></a><a name="i778195173018"></a>path</em></p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p18626736181820"><a name="p18626736181820"></a><a name="p18626736181820"></a>Searches for the class files required for compilation and specifies the location of the class files.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p16112433132010"><a name="p16112433132010"></a><a name="p16112433132010"></a># In the Demo, the getLine() method in the GetStringDemo class needs to be invoked. The .class file compiled by the GetStringDemo class is stored in the bin directory.</p>
<p id="p13429467521"><a name="p13429467521"></a><a name="p13429467521"></a>javac -cp bin Demo.java -d bin</p>
</td>
</tr>
<tr id="row642846145211"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p1342746115211"><a name="p1342746115211"></a><a name="p1342746115211"></a>-verbose</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p14710104517231"><a name="p14710104517231"></a><a name="p14710104517231"></a>Outputs information about the operations being performed by the compiler, such as loaded class information and compiled source file information.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p13427463528"><a name="p13427463528"></a><a name="p13427463528"></a># Display information about the operations that are being performed by the compiler.</p>
<p id="p597061913259"><a name="p597061913259"></a><a name="p597061913259"></a>javac -verbose -cp bin Demo.java</p>
</td>
</tr>
<tr id="row2428463528"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p105251952881"><a name="p105251952881"></a><a name="p105251952881"></a>-source <em id="i9779313155317"><a name="i9779313155317"></a><a name="i9779313155317"></a>sourceversion</em></p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p1983024422919"><a name="p1983024422919"></a><a name="p1983024422919"></a>Specifies the location of the input source files to be searched for.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p13782338155311"><a name="p13782338155311"></a><a name="p13782338155311"></a>-</p>
</td>
</tr>
<tr id="row176441743349"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p176441749342"><a name="p176441749342"></a><a name="p176441749342"></a>-sourcepath <em id="i076711126546"><a name="i076711126546"></a><a name="i076711126546"></a>path</em></p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p26440463410"><a name="p26440463410"></a><a name="p26440463410"></a>Searches for source files (Java files) required for compilation and specifies the location of the source files to be searched for, for example, JAR, ZIP, or other directories that contain Java files.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p11644444347"><a name="p11644444347"></a><a name="p11644444347"></a>-</p>
</td>
</tr>
<tr id="row143691297164"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p4369112911615"><a name="p4369112911615"></a><a name="p4369112911615"></a>-target <em id="i14257152018569"><a name="i14257152018569"></a><a name="i14257152018569"></a>targetversion</em></p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p136932971616"><a name="p136932971616"></a><a name="p136932971616"></a>Generates class files of a specific JVM version. The value can be 1.1, 1.2, 1.3, 1.4, 1.5 (or 5), 1.6 (or 6), 1.7 (or 7), or 1.8 (or 8). The default value of <em id="i11835571336"><a name="i11835571336"></a><a name="i11835571336"></a>targetversion</em> is related to <em id="i18928115712016"><a name="i18928115712016"></a><a name="i18928115712016"></a>sourceversion</em> of the <strong id="b228302515110"><a name="b228302515110"></a><a name="b228302515110"></a>-source</strong> option. The options of <em id="i4318123110111"><a name="i4318123110111"></a><a name="i4318123110111"></a>sourceversion</em> are as follows:</p>
<a name="ul13412711218"></a><a name="ul13412711218"></a><ul id="ul13412711218"><li>1.2, corresponding to target version 1.4</li><li>1.3, corresponding to target version 1.4</li><li>1.5, 1.6, 1.7, and unspecified, corresponding to target version 1.8</li><li>For other values, the values of <em id="i137183415128"><a name="i137183415128"></a><a name="i137183415128"></a>targetversion</em> and <em id="i20974133631212"><a name="i20974133631212"></a><a name="i20974133631212"></a>sourceversion</em> are the same.</li></ul>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p1037012921612"><a name="p1037012921612"></a><a name="p1037012921612"></a>-</p>
</td>
</tr>
</tbody>
</table>

#### Java Running Options

The Java running format is as follows:

Running class file:  **java**  \[_options_\]  _classesname_  \[args\]

Running Java file:  **java**  \[_options_\] -jar  _filename_  \[args\]

In the preceding information:

_options_: command options, which are separated by spaces.

_classname_: name of the running .class file.

_filename_: name of the running .jar file.

args: parameters transferred to the main\(\) function. The parameters are separated by spaces.

Java is a tool for running Java applications. It has many  _options_, but most of them are not commonly used.  [Table 4](#table371918587238)  describes the common options.

**Table  4**  Common Java running options

<a name="table371918587238"></a>
<table><thead align="left"><tr id="row19719155892316"><th class="cellrowborder" valign="top" width="33.333333333333336%" id="mcps1.2.4.1.1"><p id="p127195582239"><a name="p127195582239"></a><a name="p127195582239"></a><em id="i4719195817238"><a name="i4719195817238"></a><a name="i4719195817238"></a>options</em> Value</p>
</th>
<th class="cellrowborder" valign="top" width="33.473347334733475%" id="mcps1.2.4.1.2"><p id="p1771955817233"><a name="p1771955817233"></a><a name="p1771955817233"></a>Description</p>
</th>
<th class="cellrowborder" valign="top" width="33.193319331933196%" id="mcps1.2.4.1.3"><p id="p14719175810236"><a name="p14719175810236"></a><a name="p14719175810236"></a>Example</p>
</th>
</tr>
</thead>
<tbody><tr id="row37191558122312"><td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.2.4.1.1 "><p id="p1671955816237"><a name="p1671955816237"></a><a name="p1671955816237"></a>-cp <em id="i1871935862315"><a name="i1871935862315"></a><a name="i1871935862315"></a>path</em> or -classpath <em id="i11719858102316"><a name="i11719858102316"></a><a name="i11719858102316"></a>path</em></p>
</td>
<td class="cellrowborder" valign="top" width="33.473347334733475%" headers="mcps1.2.4.1.2 "><p id="p1152514674520"><a name="p1152514674520"></a><a name="p1152514674520"></a>Specifies the location of the file to be run and the class path to be used, including the .jar, .zip, and class file directories.</p>
<p id="p540484613433"><a name="p540484613433"></a><a name="p540484613433"></a>If there are multiple paths, separate them with colons (:).</p>
</td>
<td class="cellrowborder" valign="top" width="33.193319331933196%" headers="mcps1.2.4.1.3 "><p id="p293442512447"><a name="p293442512447"></a><a name="p293442512447"></a>-</p>
</td>
</tr>
<tr id="row1471945892312"><td class="cellrowborder" valign="top" width="33.333333333333336%" headers="mcps1.2.4.1.1 "><p id="p117191858152310"><a name="p117191858152310"></a><a name="p117191858152310"></a>-verbose</p>
</td>
<td class="cellrowborder" valign="top" width="33.473347334733475%" headers="mcps1.2.4.1.2 "><p id="p15719458172315"><a name="p15719458172315"></a><a name="p15719458172315"></a>Outputs information about the operations being performed by the compiler, such as loaded class information and compiled source file information.</p>
</td>
<td class="cellrowborder" valign="top" width="33.193319331933196%" headers="mcps1.2.4.1.3 "><p id="p1371985892314"><a name="p1371985892314"></a><a name="p1371985892314"></a># Display information about the operations that are being performed by the compiler.</p>
<p id="p1271918588236"><a name="p1271918588236"></a><a name="p1271918588236"></a>java -verbose -cp bin Demo.java</p>
</td>
</tr>
</tbody>
</table>

#### JAR Options

The JAR command format is as follows:  **jar**  \{c | t | x | u\}\[vfm0M\] \[_jarfile_\] \[_manifest_\] \[-C  _dir_\]  _file_...

[Table 5](#table3691718114817)  describes the parameters in the  **jar**  command.

**Table  5**  JAR parameter description

<a name="table3691718114817"></a>
<table><thead align="left"><tr id="row469131813486"><th class="cellrowborder" valign="top" width="33.33333333333333%" id="mcps1.2.4.1.1"><p id="p869141854816"><a name="p869141854816"></a><a name="p869141854816"></a>Parameter</p>
</th>
<th class="cellrowborder" valign="top" width="33.33333333333333%" id="mcps1.2.4.1.2"><p id="p166981819484"><a name="p166981819484"></a><a name="p166981819484"></a>Description</p>
</th>
<th class="cellrowborder" valign="top" width="33.33333333333333%" id="mcps1.2.4.1.3"><p id="p11691618144815"><a name="p11691618144815"></a><a name="p11691618144815"></a>Example</p>
</th>
</tr>
</thead>
<tbody><tr id="row186961818481"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p56921810488"><a name="p56921810488"></a><a name="p56921810488"></a>c</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p18698186485"><a name="p18698186485"></a><a name="p18698186485"></a>Creates a JAR package.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p395117464185"><a name="p395117464185"></a><a name="p395117464185"></a># Compress the hello.class files in the current directory into Hello.jar. The compression process is not displayed. If the Hello.jar files do not exist, create them. Otherwise, clear the directory.</p>
<p id="p1969718204817"><a name="p1969718204817"></a><a name="p1969718204817"></a>jar cf Hello.jar hello.class</p>
</td>
</tr>
<tr id="row5291198204514"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p529217884512"><a name="p529217884512"></a><a name="p529217884512"></a>t</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p152928874519"><a name="p152928874519"></a><a name="p152928874519"></a>Lists the contents of a JAR package.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p679215156210"><a name="p679215156210"></a><a name="p679215156210"></a># List the files contained in Hello.jar.</p>
<p id="p15292158134516"><a name="p15292158134516"></a><a name="p15292158134516"></a>jar tf Hello.jar</p>
</td>
</tr>
<tr id="row1468581013453"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p13685141074520"><a name="p13685141074520"></a><a name="p13685141074520"></a>x</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p46851710184513"><a name="p46851710184513"></a><a name="p46851710184513"></a>Decompresses a JAR package.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p14669751122111"><a name="p14669751122111"></a><a name="p14669751122111"></a># Decompress Hello.jar to the current directory. No information is displayed.</p>
<p id="p1668512104459"><a name="p1668512104459"></a><a name="p1668512104459"></a>jar xf Hello.jar</p>
</td>
</tr>
<tr id="row5230213164512"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p112301913184514"><a name="p112301913184514"></a><a name="p112301913184514"></a>u</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p1723013133454"><a name="p1723013133454"></a><a name="p1723013133454"></a>Updates the existing JAR package, for example, add files to the JAR package.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p3230313144514"><a name="p3230313144514"></a><a name="p3230313144514"></a>-</p>
</td>
</tr>
<tr id="row8709101720454"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p11709181784515"><a name="p11709181784515"></a><a name="p11709181784515"></a>v</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p2709017154510"><a name="p2709017154510"></a><a name="p2709017154510"></a>Generates a detailed report and prints it to the standard output.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p9879101591911"><a name="p9879101591911"></a><a name="p9879101591911"></a># Compress the hello.class files in the current directory into Hello.jar and display the compression process. If the Hello.jar files do not exist, create them. Otherwise, clear the directory.</p>
<p id="p1070921704511"><a name="p1070921704511"></a><a name="p1070921704511"></a>jar cvf Hello.jar hello.class</p>
</td>
</tr>
<tr id="row1080482004511"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p11805192016459"><a name="p11805192016459"></a><a name="p11805192016459"></a>f</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p158051209453"><a name="p158051209453"></a><a name="p158051209453"></a>Specifies the name of a JAR package. This parameter is mandatory.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p118051120184516"><a name="p118051120184516"></a><a name="p118051120184516"></a>-</p>
</td>
</tr>
<tr id="row11699184482"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p176991817487"><a name="p176991817487"></a><a name="p176991817487"></a>m</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p06981811483"><a name="p06981811483"></a><a name="p06981811483"></a>Specifies the manifest file to be contained.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p46915184486"><a name="p46915184486"></a><a name="p46915184486"></a>-</p>
</td>
</tr>
<tr id="row15327111618118"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p1932751619113"><a name="p1932751619113"></a><a name="p1932751619113"></a>0</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p193273161711"><a name="p193273161711"></a><a name="p193273161711"></a>If this parameter is not set, the generated JAR package is larger but faster than that generated when this parameter is not set.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p63281416513"><a name="p63281416513"></a><a name="p63281416513"></a>-</p>
</td>
</tr>
<tr id="row1861744310119"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p2617194320119"><a name="p2617194320119"></a><a name="p2617194320119"></a>M</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p1761744316114"><a name="p1761744316114"></a><a name="p1761744316114"></a>If the manifest file of all items is not generated, this parameter will be ignored.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p1579284402215"><a name="p1579284402215"></a><a name="p1579284402215"></a># Compress the hello.class files in the current directory into Hello.jar and display the compression process. If the Hello.jar files do not exist, create them. Otherwise, clear the directory. However, the manifest file is not generated when Hello.jar is created.</p>
<p id="p16617144311111"><a name="p16617144311111"></a><a name="p16617144311111"></a>jar cvfM Hello.jar hello.class</p>
</td>
</tr>
<tr id="row147450411029"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p152616437213"><a name="p152616437213"></a><a name="p152616437213"></a><em id="i726104310214"><a name="i726104310214"></a><a name="i726104310214"></a>jarfile</em></p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p107451041428"><a name="p107451041428"></a><a name="p107451041428"></a>JAR package, which is an auxiliary parameter of the <strong id="b913333192110"><a name="b913333192110"></a><a name="b913333192110"></a>f</strong> parameter.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p274516411216"><a name="p274516411216"></a><a name="p274516411216"></a>-</p>
</td>
</tr>
<tr id="row1237893913213"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p1237843913220"><a name="p1237843913220"></a><a name="p1237843913220"></a><em id="i42694316216"><a name="i42694316216"></a><a name="i42694316216"></a>manifest</em></p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p1337919391620"><a name="p1337919391620"></a><a name="p1337919391620"></a>Manifest file in .mf format, which is an auxiliary parameter of the <strong id="b158411017142115"><a name="b158411017142115"></a><a name="b158411017142115"></a>m</strong> parameter.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p337918399214"><a name="p337918399214"></a><a name="p337918399214"></a>-</p>
</td>
</tr>
<tr id="row162725361324"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p52731736622"><a name="p52731736622"></a><a name="p52731736622"></a>-C <em id="i978316291535"><a name="i978316291535"></a><a name="i978316291535"></a>dir</em></p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p1527317361325"><a name="p1527317361325"></a><a name="p1527317361325"></a>Runs the <strong id="b103281229132114"><a name="b103281229132114"></a><a name="b103281229132114"></a>jar</strong> command in the specified <em id="i11818154002118"><a name="i11818154002118"></a><a name="i11818154002118"></a>dir</em>. This command can be used only with parameters <strong id="b1899394472113"><a name="b1899394472113"></a><a name="b1899394472113"></a>c</strong> and <strong id="b296319461215"><a name="b296319461215"></a><a name="b296319461215"></a>t</strong>.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p19273636426"><a name="p19273636426"></a><a name="p19273636426"></a>-</p>
</td>
</tr>
<tr id="row18174749434"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p1417415497317"><a name="p1417415497317"></a><a name="p1417415497317"></a><em id="i9360207744"><a name="i9360207744"></a><a name="i9360207744"></a>file</em></p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p5168141281513"><a name="p5168141281513"></a><a name="p5168141281513"></a>Specifies the file or path list. All files in the file or path (including those in the recursive path) are compressed into the JAR package or the JAR package is decompressed to the path.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p18394164919196"><a name="p18394164919196"></a><a name="p18394164919196"></a># Compress all class files in the current directory into Hello.jar and display the compression process. If the Hello.jar files do not exist, create them. Otherwise, clear the directory.</p>
<p id="p1256213921917"><a name="p1256213921917"></a><a name="p1256213921917"></a>jar cvf Hello.jar *.class</p>
</td>
</tr>
</tbody>
</table>

## Class Library

The Java class library is implemented as a package, which is a collection of classes and interfaces. The Java compiler generates a bytecode file for each class, and the file name is the same as the class name. Therefore, conflicts may occur between classes with the same name. In the Java language, a group of classes and interfaces are encapsulated in a package. Class namespaces can be effectively managed by package. Classes in different packages do not conflict even if they have the same name. This solves the problem of conflicts between classes with the same name and facilitates the management of a large number of classes and interfaces. It also ensures the security of classes and interfaces.

In addition to many packages provided by Java, developers can customize packages by collecting compiled classes and interfaces into a package for future use.

Before using a custom package, you need to declare the package.

### Package Declaration

The declaration format of a package is package pkg1\[.pkg2\[.pkg3...\]\].

To declare a package, you must create a directory. The subdirectory name must be the same as the package name. Then declare the package at the beginning of the class file that needs to be placed in the package, indicating that all classes of the file belong to the package. The dot \(.\) in the package declaration indicates the directory hierarchy. If the source program file does not contain the package statement, the package is specified as an anonymous package. An anonymous package does not have a path. Generally, Java still stores the classes in the source file in the current working directory \(that is, the directory where the Java source files are stored\).

The package declaration statement must be added to the beginning of the source program file and cannot be preceded by comments or spaces. If you use the same package declaration statement in different source program files, you can include the classes in different source program files in the same package.

### Package Reference

In Java, there are two methods to use the common classes in the package provided by Java or the classes in the custom package.

-   Add the package name before the name of the class to be referenced.

    For example, name.A obj=new name.A \(\)

    **name**  indicates the package name,  **A**  indicates the class name, and  **obj**  indicates the object. This string indicates that class  **A**  in the  **name**  package is used to define an object  **obj**  in the program.

    Example: Create a test object of the Test class in the example package.

    ```
    example.Test test = new example.Test();
    ```

-   Use  **import**  at the beginning of the file to import the classes in the package.

    The format of the  **import**  statement is import pkg1\[.pkg2\[.pkg3...\]\].\(classname | \*\).

    **pkg1\[.pkg2\[.pkg3...\]\]**  indicates the package level, and  **classname**  indicates the class to be imported. If you want to import multiple classes from a package, you can use the wildcard \(\*\) instead.

    Example: Import the  **Test**  class in the  **example**  package.

    ```
    import example.Test;
    ```

    Example: Import the entire  **example**  package.

    ```
    import example.*;
    ```


## Examples



### Compiling a Java Program Without a Package

1.  Run the  **cd**  command to go to the code directory. The  **~/code**  directory is used as an example. The command is as follows:

    ```
    $ cd ~/code 
    ```

2.  Compile the Hello World program and save it as  **HelloWorld.java**. The following uses the Hello World program as an example. The command is as follows:

    ```
    $ vi HelloWorld.java
    ```

    Code example:

    ```
    public class HelloWorld {     
         public static void main(String[] args) {         
             System.out.println("Hello World");     
          } 
    }
    ```

3.  Run the following command to compile the code in the code directory:

    ```
    $ javac HelloWorld.java 
    ```

    If no error is reported, the execution is successful.

4.  After the compilation is complete, the HelloWorld.class file is generated. You can run the  **java**  command to view the result. The following is an example:

    ```
    $ java HelloWorld
    Hello World
    ```


### Compiling a Java Program with a Package

1.  Run the  **cd**  command to go to the code directory. The  **~/code**  directory is used as an example. Create the  **~/code/Test/my/example**,  **~/code/Hello/world/developers**, and  **~/code/Hi/openos/openeuler**  subdirectories in the directory to store source files.

    ```
    $ cd ~/code
    $ mkdir -p Test/my/example
    $ mkdir -p Hello/world/developers
    $ mkdir -p Hi/openos/openeuler
    ```
    
2.  Run the  **cd**  command to go to the  **~/code/Test/my/example**  directory and create  **Test.java**.

    ```
    $ cd ~/code/Test/my/example
    $ vi Test.java
    ```

    The following is an example of the Test.java code:

    ```
    package my.example;
    import world.developers.Hello;
    import openos.openeuler.Hi;
    public class Test {
      public static void main(String[] args) {
       Hello me = new Hello();
       me.hello();
       Hi you = new Hi();
       you.hi();
      }
    }
    ```

3.  Run the  **cd**  command to go to the  **~/code/Hello/world/developers**  directory and create  **Hello.java**.

    ```
    $ cd ~/code/Hello/world/developers
    $ vi Hello.java
    ```

    The following is an example of the Hello.java code:

    ```
    package world.developers;
    public class Hello {
      public void hello(){
       System.out.println("Hello, openEuler.");
      }
    }
    ```

4.  Run the  **cd**  command to go to the  **~/code/Hi/openos/openeuler**  directory and create  **Hi.java**.

    ```
    $ cd ~/code/Hi/openos/openeuler
    $ vi Hi.java
    ```

    The following is an example of the Hi.java code:

    ```
    package openos.openeuler;
    public class Hi {
      public void hi(){
       System.out.println("Hi, the global developers.");
      }
    }
    ```

5.  Run the  **cd**  command to go to the **~/code**  directory and use javac to compile the source file.

    ```
    $ cd ~/code
    $ javac -classpath Hello:Hi Test/my/example/Test.java
    ```

    After the command is executed, the  **Test.class**,  **Hello.class**, and  **Hi.class**  files are generated in the  **~/code/Test/my/example**,  **~/code/Hello/world/developers**, and  **~/code/Hi/openos/openeuler**  directories.

6.  Run the  **cd**  command to go to the  **~/code**  directory and run the  **Test**  program using Java.

    ```
    $ cd ~/code
    $ java -classpath Test:Hello:Hi my/example/Test
    ```

    The command output is as follows:

    ```
    Hello, openEuler.
    Hi, the global developers.
    ```
