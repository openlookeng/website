# Using GCC for Compilation

This chapter describes the basic knowledge of GCC compilation and provides examples for demonstration. For more information about GCC, run the  **man gcc**  command.
<!-- TOC -->

- [Using GCC for Compilation](#using-gcc-for-compilation)
    - [Overview](#overview)
    - [Basics](#basics)
        - [File Type](#file-type)
        - [Compilation Process](#compilation-process)
        - [Compilation Options](#compilation-options)
        - [Multi-file Compilation](#multi-file-compilation)
    - [Libraries](#libraries)
        - [Dynamic Link Library](#dynamic-link-library)
        - [Static Link Library](#static-link-library)
    - [Examples](#examples)
        - [Example for Using GCC to Compile C Programs](#example-for-using-gcc-to-compile-c-programs)
        - [Example for Creating and Using a DLL Using GCC](#example-for-creating-and-using-a-dll-using-gcc)
        - [Example for Creating and Using an SLL Using GCC](#example-for-creating-and-using-an-sll-using-gcc)

<!-- /TOC -->


## Overview

The GNU Compiler Collection \(GCC\) is a powerful and high-performance multi-platform compiler developed by GNU. The GCC compiler can compile and link source programs, assemblers, and target programs of C and C++ into executable files. By default, the GCC software package is installed in the openEuler OS.

## Basics



### File Type

For any given input file, the file type determines which compilation to perform.  [Table 1](#table634145764320)  describes the common GCC file types.

**Table  1**  Common GCC file types

<a name="table634145764320"></a>
<table><thead align="left"><tr id="row53445724319"><th class="cellrowborder" valign="top" width="50%" id="mcps1.2.3.1.1"><p id="p134175716436"><a name="p134175716436"></a><a name="p134175716436"></a>Extension (Suffix)</p>
</th>
<th class="cellrowborder" valign="top" width="50%" id="mcps1.2.3.1.2"><p id="p3341573439"><a name="p3341573439"></a><a name="p3341573439"></a>Description</p>
</th>
</tr>
</thead>
<tbody><tr id="row2341857174311"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p143419579434"><a name="p143419579434"></a><a name="p143419579434"></a>.c</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p1634125794311"><a name="p1634125794311"></a><a name="p1634125794311"></a>C source code file.</p>
</td>
</tr>
<tr id="row334185744314"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p134105764319"><a name="p134105764319"></a><a name="p134105764319"></a>.C, .cc, or .cxx</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p13425717436"><a name="p13425717436"></a><a name="p13425717436"></a>C++ source code file.</p>
</td>
</tr>
<tr id="row1934157104315"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p1234957124317"><a name="p1234957124317"></a><a name="p1234957124317"></a>.m</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p234135724312"><a name="p234135724312"></a><a name="p234135724312"></a>Objective-C source code file.</p>
</td>
</tr>
<tr id="row1934195713439"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p434195712430"><a name="p434195712430"></a><a name="p434195712430"></a>.s</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p1341057124316"><a name="p1341057124316"></a><a name="p1341057124316"></a>Assembly language source code file.</p>
</td>
</tr>
<tr id="row20349573432"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p4348576435"><a name="p4348576435"></a><a name="p4348576435"></a>.i</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p934175704316"><a name="p934175704316"></a><a name="p934175704316"></a>Preprocessed C source code file.</p>
</td>
</tr>
<tr id="row934195710435"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p33435704312"><a name="p33435704312"></a><a name="p33435704312"></a>.ii</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p1834957144314"><a name="p1834957144314"></a><a name="p1834957144314"></a>Preprocessed C++ source code file.</p>
</td>
</tr>
<tr id="row16341457154318"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p1034185714318"><a name="p1034185714318"></a><a name="p1034185714318"></a>.S</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p134115724318"><a name="p134115724318"></a><a name="p134115724318"></a>Pre-processed assembly language source code file.</p>
</td>
</tr>
<tr id="row4551040124512"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p165594012459"><a name="p165594012459"></a><a name="p165594012459"></a>.h</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p255164014456"><a name="p255164014456"></a><a name="p255164014456"></a>Header file contained in the program.</p>
</td>
</tr>
<tr id="row96405211469"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p136405215463"><a name="p136405215463"></a><a name="p136405215463"></a>.o</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p1064015220466"><a name="p1064015220466"></a><a name="p1064015220466"></a>Target file after compilation.</p>
</td>
</tr>
<tr id="row18053369399"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p38051366398"><a name="p38051366398"></a><a name="p38051366398"></a>.so</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p1380515367395"><a name="p1380515367395"></a><a name="p1380515367395"></a>Dynamic link library, which is a special target file.</p>
</td>
</tr>
<tr id="row473710516467"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p157371654468"><a name="p157371654468"></a><a name="p157371654468"></a>.a</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p1673795154616"><a name="p1673795154616"></a><a name="p1673795154616"></a>Static link library.</p>
</td>
</tr>
<tr id="row1052198114615"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p1521682462"><a name="p1521682462"></a><a name="p1521682462"></a>.out</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p052114814615"><a name="p052114814615"></a><a name="p052114814615"></a>Executable files, which do not have a fixed suffix. The system distinguishes executable files from unexecutable files based on file attributes. If the name of an executable file is not given, GCC generates a file named <strong id="b16772691168"><a name="b16772691168"></a><a name="b16772691168"></a>a.out</strong>.</p>
</td>
</tr>
</tbody>
</table>

### Compilation Process

Using GCC to generate executable files from source code files requires preprocessing, compilation, assembly, and linking.

1.  Preprocessing: Preprocess the source program \(such as a **.c** file\) to generate an **.i** file.
2.  Compilation: Compile the preprocessed **.i** file into an assembly language to generate an **.s** file.
3.  Assemble: Assemble the assembly language file to generate the target file **.o**.
4.  Linking: Link the **.o** files of each module to generate an executable program file.

The **.i**, **.s**, and **.o** files are intermediate or temporary files. If the GCC is used to compile programs in C language at a time, these files will be deleted.

### Compilation Options

GCC compilation command format:  **gcc**  \[_options_\] \[_filenames_\]

In the preceding information:

_options_ : compilation options.

_filenames_ : file name.

GCC is a powerful compiler. It has many  _options_, but most of them are not commonly used.  [Table 2](#table1342946175212)  describes the common  _options_.

**Table  2**  Common GCC compilation options

<a name="table1342946175212"></a>
<table><thead align="left"><tr id="row1242184611523"><th class="cellrowborder" valign="top" width="33.33333333333333%" id="mcps1.2.4.1.1"><p id="p1142134616527"><a name="p1142134616527"></a><a name="p1142134616527"></a><em id="i196115187577"><a name="i196115187577"></a><a name="i196115187577"></a>options</em> Value</p>
</th>
<th class="cellrowborder" valign="top" width="33.33333333333333%" id="mcps1.2.4.1.2"><p id="p174244605210"><a name="p174244605210"></a><a name="p174244605210"></a>Description</p>
</th>
<th class="cellrowborder" valign="top" width="33.33333333333333%" id="mcps1.2.4.1.3"><p id="p442204645214"><a name="p442204645214"></a><a name="p442204645214"></a>Example</p>
</th>
</tr>
</thead>
<tbody><tr id="row1642124685214"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p44294645211"><a name="p44294645211"></a><a name="p44294645211"></a>-c</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p34284619521"><a name="p34284619521"></a><a name="p34284619521"></a>Compiles and assembles specified source files to generate target files without linking them. It is usually used to compile subprogram files.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p14019112140"><a name="p14019112140"></a><a name="p14019112140"></a># Use the <strong id="b15704103318161"><a name="b15704103318161"></a><a name="b15704103318161"></a>-c</strong> option to compile the source files <strong id="b5730325113912"><a name="b5730325113912"></a><a name="b5730325113912"></a>test1.c</strong> and <strong id="b1037492873914"><a name="b1037492873914"></a><a name="b1037492873914"></a>test2.c</strong>.</p>
<p id="p1942746165211"><a name="p1942746165211"></a><a name="p1942746165211"></a>gcc -c test1.c test2.c</p>
</td>
</tr>
<tr id="row3421646125214"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p24254614529"><a name="p24254614529"></a><a name="p24254614529"></a>-S</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p18626736181820"><a name="p18626736181820"></a><a name="p18626736181820"></a>Compiles the specified source file to generate an assembly language file with the .s suffix but without assembling it.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p16112433132010"><a name="p16112433132010"></a><a name="p16112433132010"></a># Use the compiler to preprocess <strong id="b6956382397"><a name="b6956382397"></a><a name="b6956382397"></a>circle.c</strong>, translate it into assembly language, and store the result in circle.s.</p>
<p id="p13429467521"><a name="p13429467521"></a><a name="p13429467521"></a>gcc -S circle.c</p>
</td>
</tr>
<tr id="row642846145211"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p1342746115211"><a name="p1342746115211"></a><a name="p1342746115211"></a>-E</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p7422046195217"><a name="p7422046195217"></a><a name="p7422046195217"></a>Preprocesses specified source files without compiling them.</p>
<p id="p14710104517231"><a name="p14710104517231"></a><a name="p14710104517231"></a>By default, the output of the preprocessor is imported to a standard output stream, such as a display. You can use the <strong id="b1992235512337"><a name="b1992235512337"></a><a name="b1992235512337"></a>-o</strong> option to import it to an output file.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p13427463528"><a name="p13427463528"></a><a name="p13427463528"></a># Export the preprocessing result to the <strong id="b1412417210403"><a name="b1412417210403"></a><a name="b1412417210403"></a>circle.i</strong> file.</p>
<p id="p597061913259"><a name="p597061913259"></a><a name="p597061913259"></a>gcc -E circle.c -o circle.i</p>
</td>
</tr>
<tr id="row2428463528"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p105251952881"><a name="p105251952881"></a><a name="p105251952881"></a>-o <em id="i173821510183619"><a name="i173821510183619"></a><a name="i173821510183619"></a>file</em></p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p1983024422919"><a name="p1983024422919"></a><a name="p1983024422919"></a>Generates a specified output <em id="i11398171815369"><a name="i11398171815369"></a><a name="i11398171815369"></a>file</em> when an executable file is generated. The name must be different from that of the source file. If this option is not given, GCC generates the preset executable file <strong id="b202401010403"><a name="b202401010403"></a><a name="b202401010403"></a>a.out</strong>.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p1421946155218"><a name="p1421946155218"></a><a name="p1421946155218"></a># Use the source file as the input file and the executable file as the output file. That is, compile the entire program.</p>
<p id="p62691423153012"><a name="p62691423153012"></a><a name="p62691423153012"></a>gcc main.c func.c -o app.out</p>
</td>
</tr>
<tr id="row176441743349"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p176441749342"><a name="p176441749342"></a><a name="p176441749342"></a>-g</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p26440463410"><a name="p26440463410"></a><a name="p26440463410"></a>Contains standard debugging information in executable programs.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p11644444347"><a name="p11644444347"></a><a name="p11644444347"></a>-</p>
</td>
</tr>
<tr id="row143691297164"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p4369112911615"><a name="p4369112911615"></a><a name="p4369112911615"></a>-L <em id="i599713033614"><a name="i599713033614"></a><a name="i599713033614"></a>libary_path</em></p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p136932971616"><a name="p136932971616"></a><a name="p136932971616"></a>Adds the <em id="i1847052212361"><a name="i1847052212361"></a><a name="i1847052212361"></a>library_path</em> to the library file search path list.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p1037012921612"><a name="p1037012921612"></a><a name="p1037012921612"></a>-</p>
</td>
</tr>
<tr id="row842104610528"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p5424465527"><a name="p5424465527"></a><a name="p5424465527"></a>-I<em id="i10991558173512"><a name="i10991558173512"></a><a name="i10991558173512"></a>library</em></p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p18320171014373"><a name="p18320171014373"></a><a name="p18320171014373"></a>Searches for the specified function <em id="i2372113093620"><a name="i2372113093620"></a><a name="i2372113093620"></a>library</em> during linking.</p>
<p id="p16725256915"><a name="p16725256915"></a><a name="p16725256915"></a>When GCC is used to compile and link programs, GCC links <strong id="b14242202114016"><a name="b14242202114016"></a><a name="b14242202114016"></a>libc.a</strong> or <strong id="b899592344010"><a name="b899592344010"></a><a name="b899592344010"></a>libc.so</strong> by default. However, other libraries (such as non-standard libraries and third-party libraries) need to be manually added.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p74284665213"><a name="p74284665213"></a><a name="p74284665213"></a># Use the <strong id="b2509151215374"><a name="b2509151215374"></a><a name="b2509151215374"></a>-l</strong> option to link the math library.</p>
<p id="p38153114016"><a name="p38153114016"></a><a name="p38153114016"></a>gcc main.c -o main.out -lm</p>
<div class="note" id="note267663724120"><a name="note267663724120"></a><a name="note267663724120"></a><span class="notetitle"> NOTE: </span><div class="notebody"><p id="p14677203718413"><a name="p14677203718413"></a><a name="p14677203718413"></a>The file name of the math library is <strong id="b5740163015409"><a name="b5740163015409"></a><a name="b5740163015409"></a>libm.a</strong>. The prefix lib and suffix .a are standard, and <strong id="b9482103019379"><a name="b9482103019379"></a><a name="b9482103019379"></a>m</strong> is the basic name. GCC automatically adds these prefixes and suffixes to the basic name following the <strong id="b3245194017372"><a name="b3245194017372"></a><a name="b3245194017372"></a>-l</strong> option. In this example, the basic name is <strong id="b1610984373710"><a name="b1610984373710"></a><a name="b1610984373710"></a>m</strong>.</p>
</div></div>
</td>
</tr>
<tr id="row52061353193420"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p7206175319346"><a name="p7206175319346"></a><a name="p7206175319346"></a>-I <em id="i19693154753619"><a name="i19693154753619"></a><a name="i19693154753619"></a>head_path</em></p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p120610535342"><a name="p120610535342"></a><a name="p120610535342"></a>Adds the <em id="i0580453193716"><a name="i0580453193716"></a><a name="i0580453193716"></a>head_path</em> to the search path list of the header file.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p82061053203413"><a name="p82061053203413"></a><a name="p82061053203413"></a>-</p>
</td>
</tr>
<tr id="row366111303814"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p266713193820"><a name="p266713193820"></a><a name="p266713193820"></a>-static</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p96691363816"><a name="p96691363816"></a><a name="p96691363816"></a>Performs static compilation and links static libraries. Do not link dynamic libraries.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p1266913103816"><a name="p1266913103816"></a><a name="p1266913103816"></a>-</p>
</td>
</tr>
<tr id="row19323190113910"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p8323190153911"><a name="p8323190153911"></a><a name="p8323190153911"></a>-shared</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p18490202055012"><a name="p18490202055012"></a><a name="p18490202055012"></a>Default option, which can be omitted.</p>
<a name="ul192366134394"></a><a name="ul192366134394"></a><ul id="ul192366134394"><li>A dynamic library file can be generated.</li><li>During dynamic compilation, the dynamic library is preferentially linked. The static library with the same name is linked only when there is no dynamic library.</li></ul>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p18323150113918"><a name="p18323150113918"></a><a name="p18323150113918"></a>-</p>
</td>
</tr>
<tr id="row1867594174012"><td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.1 "><p id="p14675641184011"><a name="p14675641184011"></a><a name="p14675641184011"></a>-fPIC (or -fpic)</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.2 "><p id="p1267518411405"><a name="p1267518411405"></a><a name="p1267518411405"></a>Generates location-independent target code that uses a relative address. Generally, the <strong id="b125321721133910"><a name="b125321721133910"></a><a name="b125321721133910"></a>-static</strong> option is used to generate a dynamic library file from the PIC target file.</p>
</td>
<td class="cellrowborder" valign="top" width="33.33333333333333%" headers="mcps1.2.4.1.3 "><p id="p26751941134013"><a name="p26751941134013"></a><a name="p26751941134013"></a>-</p>
</td>
</tr>
</tbody>
</table>

### Multi-file Compilation

There are two methods provided for compiling multiple source files.

-   Multiple source files are compiled at the same time. All files need to be recompiled during compilation.

    Example: Compile  **test1.c**  and  **test2.c**  and link them to the executable file  **test**.

    ```
    $ gcc test1.c test2.c -o test
    ```

-   Compile each source file, and then link the target files generated after compilation. During compilation, only modified files need to be recompiled.

    For example, compile  **test1.c**  and  **test2.c**, and link the target files  **test1.o**  and  **test2.o**  to the executable file  **test**.

    ```
    $ gcc -c test1.c
    $ gcc -c test2.c
    $ gcc -o test1.o test2.o -o test
    ```


## Libraries

A library is mature and reusable code that has been written for use. Each program depends on many basic underlying libraries.

The library file name is prefixed with lib and suffixed with .so \(dynamic library\) or .a \(static library\). The middle part is the user-defined library file name, for example, libfoo.so or libfoo.a. Because all library files comply with the same specifications, the  **lib**  prefix can be omitted when the  **-l**  option specifies the name of the linked library file. That is, when GCC processes  **-lfoo**, the library file  **libfoo.so**  or  **libfoo.a**  is automatically linked. When creating a library, you must specify the full file name  **libfoo.so**  or  **libfoo.a**.

Libraries are classified into static libraries and dynamic libraries based on the linking time. The static library links and packs the target file .o generated by assembly and the referenced library into an executable file in the linking phase. The dynamic library is not linked to the target code when the program is compiled, but is loaded when the program is run. The differences are as follows:

-   The resource usage is different.

    The static library is a part of the generated executable file, while the dynamic library is a separate file. Therefore, the sizes and occupied disk space of the executable files of the static library and dynamic library are different, which leads to different resource usage.

-   The scalability and compatibility are different.

    If the implementation of a function in the static library changes, the executable file must be recompiled. For the executable file generated by dynamic linking, only the dynamic library needs to be updated, and the executable file does not need to be recompiled.

-   The dependency is different.

    The executable file of the static library can run without depending on any other contents, while the executable file of the dynamic library must depend on the dynamic library. Therefore, the static library is convenient to migrate.

-   The loading speeds are different.

    Static libraries are linked together with executable files, while dynamic libraries are linked only when they are loaded or run. Therefore, for the same program, static linking is faster than dynamic linking.



### Dynamic Link Library

You can use the  **-shared**  and  **-fPIC**  options to create a dynamic link library \(DLL\) with the source file, assembly file, or target file. The  **-fPIC**  option is used in the compilation phase. This option is used when the target file is generated, so as to generate location-independent code.

Example 1: Generate a DLL from the source file.

```
$ gcc -fPIC -shared test.c -o libtest.so
```

Example 2: Generate a DLL from the target file.

```
$ gcc -fPIC -c test.c -o test.o
$ gcc -shared test.o -o libtest.so
```

To link a DLL to an executable file, you need to list the name of the DLL in the command line.

Example: Compile  **main.c**  and  **libtest.so**  into  **app.out**. When  **app.out**  is running, the link library  **libtest.so**  is dynamically loaded.

```
$ gcc main.c libtest.so -o app.out
```

In this mode, the  **libtest.so**  file in the current directory is used.

If you choose to search for a DLL, to ensure that the DLL can be linked when the program is running, you must implement by using one of the following methods:

-   Save the DLL to a standard directory, for example,  **/usr/lib**.
-   Add the DLL path  **libaryDIR**  to the environment variable  **LD\_LIBRARY\_PATH**.

    $ export LD\_LIBRARY\_PATH=libraryDIR:$LD\_LIBRARY\_PATH

    >![](public_sys-resources/icon-note.gif) **NOTE:**   
    >**LD\_LIBRARY\_PATH**  is an environment variable of the DLL. If the DLL is not in the default directories \(**/lib**  and  **/usr/lib**\), you need to specify the environment variable  **LD\_LIBRARY\_PATH**.  

-   Add the DLL path  **libaryDIR**  to  **/etc/ld.so.conf**  and run  **ldconfig**, or use the DLL path  **libaryDIR**  as a parameter to run  **ldconfig**.

```
$ gcc main.c -L libraryDIR -ltest -o app.out
$ export LD_LIBRARY_PATH=libraryDIR:$LD_LIBRARY_PATH
```

### Static Link Library

To create a static link library \(SLL\), you need to compile the source file to the target file, and then run the  **ar**  command to compress the target file into an SLL.

Example: Compile and compress source files  **test1.c**,  **test2.c**, and  **test3.c**  into an SLL.

```
$ gcc -c test1.c test2.c test3.c
$ ar rcs libtest.a test1.o test2.o test3.o
```

The  **ar**  command is a backup compression command. You can compress multiple files into a backup file \(also called an archive file\) or extract member files from the backup file. The most common use of  **ar**  is to compress the target files into an SLL.

The format of the  **ar**  command to compress the target files into an SLL is as follows:

ar rcs  _Sllfilename_ _Targetfilelist_

-   _Sllfilename_ : Name of the static library file.
-   _Targetfilelist_ : Target file list.
-   **r**: replaces the existing target file in the library or adds a new target file.
-   **c**: creates a library regardless of whether the library exists.
-   **s**: creates the index of the target file. The speed can be improved when a large library is created.

Example: Create a main.c file to use the SLL.

```
$ gcc main.c -L libraryDIR -ltest -o test.out
```

In the preceding command,  **libraryDIR**  indicates the path of the libtest.a library.

## Examples



### Example for Using GCC to Compile C Programs

1.  Run the  **cd**  command to go to the code directory. The  **~/code**  directory is used as an example. The command is as follows:

    ```
    $ cd ~/code 
    ```

2.  Compile the Hello World program and save it as  **helloworld.c**. The following uses the Hello World program as an example. The command is as follows:

    ```
    $ vi helloworld.c
    ```

    Code example:

    ```
    #include <stdio.h>    
    int main()    
    {    
           printf("Hello World!\n");       
           return 0;    
    }
    ```

3.  Run the following command to compile the code in the code directory:

    ```
    $ gcc helloworld.c -o helloworld
    ```

    If no error is reported, the execution is successful.

4.  After the compilation is complete, the helloworld file is generated. Check the compilation result. The following is an example:

    ```
    $ ./helloworld
    Hello World!
    ```


### Example for Creating and Using a DLL Using GCC

1.  Run the  **cd**  command to go to the code directory. The  **~/code**  directory is used as an example. Create the  **src**,  **lib**, and  **include**  subdirectories in the directory to store the source file, DLL file, and header file, respectively.

    ```
    $ cd ~/code
    $ mkdir src lib include
    ```
    
2.  Run the  **cd**  command to go to the  **~/code/src**  directory and create two functions  **add.c**  and  **sub.c**  to implement addition and subtraction, respectively.

    ```
    $ cd ~/code/src
    $ vi add.c
    $ vi sub.c
    ```

    The following is an example of the  **add.c**  code:

    ```
    #include "math.h"
    int add(int a, int b)
    {
            return a+b;
    }
    ```

    The following is an example of the  **sub.c**  code:

    ```
    #include "math.h"
    int sub(int a, int b)
    {
            return a-b;
    }
    ```

3.  Compile the source files add.c and sub.c into the DLL libmath.so, and store the DLL in the  **~/code/lib**  directory.

    ```
    $ gcc -fPIC -shared add.c sub.c -o ~/code/lib/libmath.so
    ```

4.  Go to the  **~/code/include**  directory, create a header file  **math.h**, and declare the header file of the function.

    ```
    $ cd ~/code/include
    $ vi math.h
    ```

    The following is an example of the  **math.h**  code:

    ```
    #ifndef __MATH_H_
    #define __MATH_H_
    int add(int a, int b);
    int sub(int a, int b);
    #endif
    ```

5.  Run the  **cd**  command to go to the  **~/code/src**  directory and create a  **main.c**  function that invokes add\(\) and sub\(\).

    ```
    $ cd ~/code/src
    $ vi main.c
    ```

    The following is an example of the  **math.c**  code:

    ```
    #include <stdio.h>
    #include "math.h"
    int main()
    {
            int a, b;
            printf("Please input a and b:\n");
            scanf("%d %d", &a, &b);
            printf("The add: %d\n", add(a,b));
            printf("The sub: %d\n", sub(a,b));
            return 0;
    }
    ```

6.  Compile  **main.c**  and  **libmath.so**  into  **math.out**.

    ```
    $ gcc main.c -I ~/code/include -L ~/code/lib -lmath -o math.out
    ```

7.  Add the path of the DLL to the environment variable.

    ```
    $ export LD_LIBRARY_PATH=~/code/lib:$LD_LIBRARY_PATH
    ```

8.  Run the following command to execute  **math.out**:

    ```
    $ ./math.out
    ```

    The command output is as follows:

    ```
    Please input a and b:
    9 2
    The add: 11
    The sub: 7
    ```


### Example for Creating and Using an SLL Using GCC

1.  Run the  **cd**  command to go to the code directory. The  **~/code**  directory is used as an example. Create the  **src**,  **lib**, and  **include**  subdirectories in the directory to store the source file, SLL file, and header file respectively.

    ```
    $ cd ~/code
    $ mkdir src lib include
    ```
    
2.  Run the  **cd**  command to go to the  **~/code/src**  directory and create two functions  **add.c**  and  **sub.c**  to implement addition and subtraction, respectively.

    ```
    $ cd ~/code/src
    $ vi add.c
    $ vi sub.c
    ```

    The following is an example of the  **add.c**  code:

    ```
    #include "math.h"
    int add(int a, int b)
    {
            return a+b;
    }
    ```

    The following is an example of the  **sub.c**  code:

    ```
    #include "math.h"
    int sub(int a, int b)
    {
            return a-b;
    }
    ```

3.  Compile the source files  **add.c**  and  **sub.c**  into the target files  **add.o**  and  **sub.o**.

    ```
    $ gcc -c add.c sub.c
    ```

4.  Run the  **ar**  command to compress the  **add.o**  and  **sub.o**  target files into the SLL  **libmath.a**  and save the SLL to the  **~/code/lib**  directory.

    ```
    $ ar rcs ~/code/lib/libmath.a add.o sub.o
    ```

5.  Go to the  **~/code/include**  directory, create a header file  **math.h**, and declare the header file of the function.

    ```
    $ cd ~/code/include
    $ vi math.h
    ```

    The following is an example of the  **math.h**  code:

    ```
    #ifndef __MATH_H_
    #define __MATH_H_
    int add(int a, int b);
    int sub(int a, int b);
    #endif
    ```

6.  Run the  **cd**  command to go to the  **~/code/src**  directory and create a  **main.c**  function that invokes add\(\) and sub\(\).

    ```
    $ cd ~/code/src
    $ vi main.c
    ```

    The following is an example of the  **math.c**  code:

    ```
    #include <stdio.h>
    #include "math.h"
    int main()
    {
            int a, b;
            printf("Please input a and b:\n");
            scanf("%d %d", &a, &b);
            printf("The add: %d\n", add(a,b));
            printf("The sub: %d\n", sub(a,b));
            return 0;
    }
    ```

7.  Compile  **main.c**  and  **libmath.a**  into  **math.out**.

    ```
    $ gcc main.c -I ~/code/include -L ~/code/lib -lmath -o math.out
    ```

8.  Run the following command to execute  **math.out**:

    ```
    $ ./math.out
    ```

    The command output is as follows:

    ```
    Please input a and b:
    9 2
    The add: 11
    The sub: 7
    ```
