# C语言的MAIN函数

## main函数的标准语法

在C89/C99/C11的语法标准中,C语言的main函数是这样的

```c
int main(void)
{
    return 0;
}
```
或
```c
int main(int argc, char *argv[])
{
    return 0;
}
```

&emsp;&emsp;`argc` 是 argument count的缩写，表示传入main函数的**参数个数**.  

&emsp;&emsp;`argv` 是 argument vector的缩写，表示传入main函数的参数序列或指针，并且第一个参数argv[0]**一定是程序的名称**，并且**包含了程序所在的完整路径**，所以确切的说需要我们输入的main函数的参数个数应该是argc-1个.  

&emsp;&emsp;在没有参数传入的情况下，保存程序名称的第一个变量argv[0]依然存在.  

```c
#include<stdio.h>

int main(int argc, char *argv[])
{
	int i = 0;
	printf("%d\n",argc);
	
	for(i = 0; i < argc; i++)
	{
		printf("%s\n",argv[i]);
	}
	
	return 0;
} 
```

CMD运行时输入 `a.exe hello world`  

输出[^1]

[^1]: 这里没有输出完整路径是因为在运行时也要输入**绝对路径**

```
a.exe
hello
world
```

