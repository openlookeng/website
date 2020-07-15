# Appendix

This chapter describes the file permissions and  **umask**  values.

- [Appendix](#appendix.md)
    - [Permissions on Files and Directories](#permissions-on-files-and-directories)
    - [umask Values](#umask-values)





## Permissions on Files and Directories

Permission on files and directories in Linux specifies the users who can access and perform operations on files and directories and the access and operation modes. Permissions on files and directories include read only, write only, and execute.

The following types of users can access files and directories:

-   File creator
-   Users in the same group as a file creator
-   Users not in the same group as a file creator

An example of permission on files and directories is described as follows:

If the permission on  **/usr/src**  is set to  **755**  which is 111101101 in binary mode, permissions for each type of users are described as follows:

-   The left-most  **111**  indicates that the file owner can read, write, and execute the file.
-   The middle  **101**  indicates the group users can read and execute but cannot write the file. 
-   The right-most  **101**  indicates that other users can read and execute but cannot write the file. 

## umask Values

When a user creates a file or directory, the file or directory has a default permission. The default permission is specified by the  **umask**  value.

The  **umask**  value is the complement of the permission value. The actual permission value is obtained by subtracting the  **umask**  value from the default maximum permission value. The default maximum permission of a file is readable and writable. The default maximum permission of a directory is readable, writable, and executable. The default permission of a file is 666 minus the  **umask**  value. The default permission of a directory is 777 minus the  **umask**  value.

