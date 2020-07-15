# Using Make for Compilation

This chapter describes the basic knowledge of make compilation and provides examples for demonstration. For more information about Make, run the  **man make**  command.
<!-- TOC -->

- [Using Make for Compilation](#using-make-for-compilation)
    - [Overview](#overview)
    - [Basics](#basics)
        - [File Type](#file-type)
        - [make Work Process](#make-work-process)
        - [make Options](#make-options)
    - [Makefiles](#makefiles)
        - [Makefile Structure](#makefile-structure)
        - [Makefile Contents](#makefile-contents)
    - [Examples](#examples)
        - [Example of Using Makefile to Implement Compilation](#example-of-using-makefile-to-implement-compilation)

<!-- /TOC -->

## Overview

The GNU make utility \(usually abbreviated as make\) is a tool for controlling the generation of executable files from source files. make automatically identifies which parts of the complex program have changed and need to be recompiled. Make uses a configuration file called makefiles to control how the program is built.

## Basics


### File Type

[Table 1](#table634145764320)  describes the file types that may be used in the makefiles file.

**Table  1**  File types

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
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p052114814615"><a name="p052114814615"></a><a name="p052114814615"></a>Executable files, which do not have a fixed suffix. The system distinguishes executable files from unexecutable files based on file attributes. If the name of an executable file is not given, GCC generates a file named <strong>a.out</strong>.</p>
</td>
</tr>
</tbody>
</table>

### make Work Process

The process of deploying make to generate an executable file from the source code file is described as follows:

1.  The make command reads the Makefiles, including the files named GNUmakefile, makefile, and Makefile in the current directory, the included makefile, and the rule files specified by the  **-f**,  **\-\-file**, and  **\-\-makefile**  options.
2.  Initialize variables.
3.  Derive implicit rules, analyze dependencies, and create a dependency chain.
4.  Determine which targets need to be regenerated based on the dependency chain.
5.  Run a command to generate the final file.

### make Options

make command format:  **make**  \[_option_\]... \[_target_\]...

In the preceding command:

_option_ : parameter option.

_target_ : target specified in Makefile.

[Table 2](#table261872312343)  describes the common make options.

**Table  2**  Common make options

<a name="table261872312343"></a>
<table><thead align="left"><tr id="row483385416347"><th class="cellrowborder" valign="top" width="50%" id="mcps1.2.3.1.1"><p id="p16140827163512"><a name="p16140827163512"></a><a name="p16140827163512"></a><em id="i1140132713516"><a name="i1140132713516"></a><a name="i1140132713516"></a>options</em> Value</p>
</th>
<th class="cellrowborder" valign="top" width="50%" id="mcps1.2.3.1.2"><p id="p16140627193516"><a name="p16140627193516"></a><a name="p16140627193516"></a>Description</p>
</th>
</tr>
</thead>
<tbody><tr id="row146641223153417"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p66641723183418"><a name="p66641723183418"></a><a name="p66641723183418"></a>-C <em id="i2071143410371"><a name="i2071143410371"></a><a name="i2071143410371"></a>dir</em>, \-\-directory=<em id="i185241138163720"><a name="i185241138163720"></a><a name="i185241138163720"></a>dir</em></p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p167365374545"><a name="p167365374545"></a><a name="p167365374545"></a>Specifies <em id="i16802119115913"><a name="i16802119115913"></a><a name="i16802119115913"></a>dir</em> as the working directory after the make command starts to run.</p>
<p id="p136641923113412"><a name="p136641923113412"></a><a name="p136641923113412"></a>When there are multiple <strong id="b208679153538"><a name="b208679153538"></a><a name="b208679153538"></a>-C</strong> options, the final working directory of make is the relative path of the first directory.</p>
</td>
</tr>
<tr id="row3664223203419"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p9664102313340"><a name="p9664102313340"></a><a name="p9664102313340"></a>-d</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p7664923163412"><a name="p7664923163412"></a><a name="p7664923163412"></a>Displays all debugging information during execution of the make command. You can use the <strong id="b1215855615316"><a name="b1215855615316"></a><a name="b1215855615316"></a>-d</strong> option to display all the information during the construction of the dependency chain and the reconstruction of the target.</p>
</td>
</tr>
<tr id="row18664623103415"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p176641423143414"><a name="p176641423143414"></a><a name="p176641423143414"></a>-e, \-\-environment-overrides</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p1066472313418"><a name="p1066472313418"></a><a name="p1066472313418"></a>Overwrites the variable definition with the same name in Makefile with the environment variable definition.</p>
</td>
</tr>
<tr id="row7664223163412"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p176641023193413"><a name="p176641023193413"></a><a name="p176641023193413"></a>-f <em id="i103449715424"><a name="i103449715424"></a><a name="i103449715424"></a>file</em>, \-\-file=<em id="i590218152429"><a name="i590218152429"></a><a name="i590218152429"></a>file</em>, </p>
<p id="p6664723133418"><a name="p6664723133418"></a><a name="p6664723133418"></a>\-\-makefile=<em id="i894722504216"><a name="i894722504216"></a><a name="i894722504216"></a>file</em></p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p86640231342"><a name="p86640231342"></a><a name="p86640231342"></a>Specifies the <em id="i181001119204311"><a name="i181001119204311"></a><a name="i181001119204311"></a>file</em> as the Makefile for the make command.</p>
</td>
</tr>
<tr id="row1391931413209"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p17146416192013"><a name="p17146416192013"></a><a name="p17146416192013"></a>-p, \-\-help</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p714619161208"><a name="p714619161208"></a><a name="p714619161208"></a>Displays help information.</p>
</td>
</tr>
<tr id="row1665132393417"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p1514691616203"><a name="p1514691616203"></a><a name="p1514691616203"></a>-i, \-\-ignore-errors</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p1014611652012"><a name="p1014611652012"></a><a name="p1014611652012"></a>Ignores the errors occurred during the execution.</p>
</td>
</tr>
<tr id="row16160373176"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p8337171661716"><a name="p8337171661716"></a><a name="p8337171661716"></a>-k, \-\-keep-going</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p489185181713"><a name="p489185181713"></a><a name="p489185181713"></a>When an error occurs during command execution, the make command is not terminated. The make command executes all commands as many as possible until a known error occurs.</p>
</td>
</tr>
<tr id="row17665152314345"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p76651023113414"><a name="p76651023113414"></a><a name="p76651023113414"></a>-n, \-\-just-print, \-\-dry-run</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p4301952237"><a name="p4301952237"></a><a name="p4301952237"></a>Simulates the execution of commands (including the commands starting with @) in the actual execution sequence. This command is used only to display the execution process and has no actual execution effect.</p>
</td>
</tr>
<tr id="row10665112310347"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p17665182320346"><a name="p17665182320346"></a><a name="p17665182320346"></a>-o <em id="i4538184125117"><a name="i4538184125117"></a><a name="i4538184125117"></a>file</em>, \-\-old-file=<em id="i197559712516"><a name="i197559712516"></a><a name="i197559712516"></a>file</em>, \-\-assume-old=<em id="i142693115512"><a name="i142693115512"></a><a name="i142693115512"></a>file</em></p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p9665142320347"><a name="p9665142320347"></a><a name="p9665142320347"></a>The specified <em id="i785024317515"><a name="i785024317515"></a><a name="i785024317515"></a>file</em> does not need to be rebuilt even if its dependency has expired, and no target of this dependency file is rebuilt.</p>
</td>
</tr>
<tr id="row724955371216"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p19485191915135"><a name="p19485191915135"></a><a name="p19485191915135"></a>-p, \-\-print-date-base</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p5485121951311"><a name="p5485121951311"></a><a name="p5485121951311"></a>Before the command is executed, all data of Makefile read by make and the version information of make are printed. If you only need to print the data, run the <strong id="b1524144615716"><a name="b1524144615716"></a><a name="b1524144615716"></a>make -qp</strong> command to view the preset rules and variables before the make command is executed. You can run the <strong id="b2760145314572"><a name="b2760145314572"></a><a name="b2760145314572"></a>make -p -f /dev/null </strong>command.</p>
</td>
</tr>
<tr id="row14665152343412"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p1366572313418"><a name="p1366572313418"></a><a name="p1366572313418"></a>-r, \-\-no-builtin-rules</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p185914010119"><a name="p185914010119"></a><a name="p185914010119"></a>Ignores the use of embedded implicit rules and the implicit suffix list of all suffix rules.</p>
</td>
</tr>
<tr id="row10665423163414"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p19665192317342"><a name="p19665192317342"></a><a name="p19665192317342"></a>-R, \-\-no-builtin-variabes</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p19665023153418"><a name="p19665023153418"></a><a name="p19665023153418"></a>Ignores embedded hidden variables.</p>
</td>
</tr>
<tr id="row1466522383419"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p56651423143412"><a name="p56651423143412"></a><a name="p56651423143412"></a>-s, \-\-silent, \-\-quiet</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p7665112319348"><a name="p7665112319348"></a><a name="p7665112319348"></a>Cancels the printing during the command execution.</p>
</td>
</tr>
<tr id="row1665132317347"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p1166562312348"><a name="p1166562312348"></a><a name="p1166562312348"></a>-S, \-\-no-keep-going, \-\-stop</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p1966582310346"><a name="p1966582310346"></a><a name="p1966582310346"></a>Cancels the <strong id="b738262219581"><a name="b738262219581"></a><a name="b738262219581"></a>-k</strong> option. In the recursive make process, the sub-make inherits the upper-layer command line option through the <strong id="b12527938195812"><a name="b12527938195812"></a><a name="b12527938195812"></a>MAKEFLAGS</strong> variable. You can use the <strong id="b18115449586"><a name="b18115449586"></a><a name="b18115449586"></a>-S</strong> option in the sub-make to cancel the <strong id="b1153515478587"><a name="b1153515478587"></a><a name="b1153515478587"></a>-k</strong> option transferred by the upper-layer command, or cancel the <strong id="b179113118594"><a name="b179113118594"></a><a name="b179113118594"></a>-k</strong> option in the system environment variable <strong id="b1244011515591"><a name="b1244011515591"></a><a name="b1244011515591"></a>MAKEFLAGS</strong>.</p>
</td>
</tr>
<tr id="row15665192317347"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p2665132319342"><a name="p2665132319342"></a><a name="p2665132319342"></a>-t, \-\-touch</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p1866562383420"><a name="p1866562383420"></a><a name="p1866562383420"></a>Updates the timestamp of all target files to the current system time. Prevents make from rebuilding all outdated target files.</p>
</td>
</tr>
<tr id="row9665223123417"><td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.1 "><p id="p20665423203414"><a name="p20665423203414"></a><a name="p20665423203414"></a>-v, version</p>
</td>
<td class="cellrowborder" valign="top" width="50%" headers="mcps1.2.3.1.2 "><p id="p196651723153419"><a name="p196651723153419"></a><a name="p196651723153419"></a>Displays the make version.</p>
</td>
</tr>
</tbody>
</table>

## Makefiles

Make is a tool that uses makefiles for compilation, linking, installation, and cleanup, so as to generate executable files and other related files from source code files. Therefore, makefiles describe the compilation and linking rules of the entire project, including which files need to be compiled, which files do not need to be compiled, which files need to be compiled first, which files need to be compiled later, and which files need to be rebuilt. The makefiles automate project compilation. You do not need to manually enter a large number of source files and parameters each time.

This chapter describes the structure and main contents of makefiles. For more information about makefiles, run the  **info make**  command.

### Makefile Structure

The makefile file structure is as follows:

_targets_:_prereguisites_

_command_

or

_targets_:_prerequisites_;_command_

_command_

In the preceding information:

-   _targets_ : targets, which can be target files, executable files, or tags.
-   _prerequisites_ : dependency files, which are the files or targets required for generating the  _targets_. There can be multiple or none of them.
-   _command_ : command \(any shell command\) to be executed by make. Multiple commands are allowed, and each command occupies a line.
-   Use colons \(:\) to separate the target files from the dependency files. Press  **Tab**  at the beginning of each command line.

The makefile file structure indicates the output target, the object on which the output target depends, and the command to be executed for generating the target.

### Makefile Contents

A makefile file consists of the following contents:

-   Explicit rule

    Specify the dependency, such as the file to be generated, dependency file, and generated command.

-   Implicit rule

    Specify the rule that is automatically derived by make. The make command supports the automatic derivation function.

-   Variable definition
-   File indicator

    The file indicator consists of three parts:

    -   Inclusion of other makefiles, for example, include xx.md
    -   Selective execution, for example, \#ifdef
    -   Definition of multiple command lines, for example, define...endef. \(define ... endef\)

-   Comment

    The comment starts with a number sign \(\#\).


## Examples



### Example of Using Makefile to Implement Compilation

1.  Run the  **cd**  command to go to the code directory. The  **~/code**  directory is used as an example.

    ```
    $ cd ~/code
    ```

2. Create a header file  **hello.h**  and two functions  **hello.c**  and  **main.c**.

    ```
    $ vi hello.h
    $ vi hello.c
    $ vi main.c
    ```

    The following is an example of the  **hello.h**  code:

    ```
    #pragma once
    #include <stdio.h>
    void hello();
    ```

    The following is an example of the  **hello.c**  code:

    ```
    #include "hello.h"
    void hello()
    {
            int i=1;
            while(i<5)
            {
                    printf("The %dth say hello.\n", i);
                    i++;
            }
    }
    
    ```

    The following is an example of the  **main.c**  code:

    ```
    #include "hello.h"
    #include <stdio.h>
    int main()
    {
            hello();
            return 0;
    }
    ```

3.  Create the makefile.

    ```
    $ vi Makefile
    ```

    The following provides an example of the makefile content:

    ```
    main:main.o hello.o
            gcc -o main main.o hello.o
    main.o:main.c
            gcc -c main.c
    hello.o:hello.c
            gcc -c hello.c
    clean:
            rm -f hello.o main.o main
    ```

4.  Run the  **make**  command.

    ```
    $ make
    ```

    After the command is executed, the commands executed in makefile are printed. If you do not need to print the information, add the  **-s**  option to the  **make**  command.

    gcc -c main.c

    gcc -c hello.c

    gcc -o main main.o hello.o

5.  Execute the ./main target.

    ```
    $ ./main
    ```

    After the command is executed, the following information is displayed:

    The 1th say hello.

    The 2th say hello.

    The 3th say hello.

    The 4th say hello.
