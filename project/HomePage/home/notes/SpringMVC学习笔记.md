# SpringMVC学习笔记

## 目录

[TOC]

## SpringMVC简介

### 什么是MVC 

* MVC是一种软件架构的思想，将软件按照模型、视图、控制器来划分
    * M：Model，模型层，指工程中的JavaBean，作用是处理数据
        * JavaBean分为两类：
            * 一类称为实体类Bean：专门存储业务数据的，如 Student、User 等
            * 一类称为业务处理 Bean：指 Service 或 Dao 对象，专门用于处理业务逻辑和数据访问。
    * V：View，视图层，指工程中的html或jsp等页面，作用是与用户进行交互，展示数据
    * C：Controller，控制层，指工程中的servlet，作用是接收请求和响应浏览器
* MVC的工作流程：
* 用户通过视图层发送请求到服务器，在服务器中请求被Controller接收，Controller调用相应的Model层处理请求，处理完毕将结果返回到Controller，Controller再根据请求处理的结果找到相应的View视图，渲染数据后最终响应给浏览器

## SpringMVC准备

* 引入依赖

```xml
<dependencies>
    <!-- SpringMVC -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>5.3.1</version>
    </dependency>

    <!-- 日志 -->
    <dependency>
        <groupId>ch.qos.logback</groupId>
        <artifactId>logback-classic</artifactId>
        <version>1.2.3</version>
    </dependency>

    <!-- ServletAPI -->
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>3.1.0</version>
        <scope>provided</scope>
    </dependency>

    <!-- Spring5和Thymeleaf整合包 -->
    <dependency>
        <groupId>org.thymeleaf</groupId>
        <artifactId>thymeleaf-spring5</artifactId>
        <version>3.0.12.RELEASE</version>
    </dependency>
</dependencies>
```

* 配置web.xml

```xml
<!-- 配置SpringMVC的前端控制器，对浏览器发送的请求统一进行处理 -->
<servlet>
    <servlet-name>springMVC</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <!-- 通过初始化参数指定SpringMVC配置文件的位置和名称 -->
    <init-param>
        <!-- contextConfigLocation为固定值 -->
        <param-name>contextConfigLocation</param-name>
        <!-- 使用classpath:表示从类路径查找配置文件，例如maven工程中的src/main/resources -->
        <param-value>classpath:springMVC.xml</param-value>
    </init-param>
    <!-- 
 		作为框架的核心组件，在启动过程中有大量的初始化操作要做
		而这些操作放在第一次请求时才执行会严重影响访问速度
		因此需要通过此标签将启动控制DispatcherServlet的初始化时间提前到服务器启动时
	-->
    <load-on-startup>1</load-on-startup>
</servlet>
<servlet-mapping>
    <servlet-name>springMVC</servlet-name>
    <!--
        设置springMVC的核心控制器所能处理的请求的请求路径
        /所匹配的请求可以是/login或.html或.js或.css方式的请求路径
        但是/不能匹配.jsp请求路径的请求
    -->
    <url-pattern>/</url-pattern>
</servlet-mapping>
```

* 创建请求控制器

```java
@Controller
public class HelloController {
    
}
```

* 创建SpringMVC配置文件
* 名字上面已定义：`<param-value>classpath:springMVC.xml</param-value>`
* 处理静态资源
    * html/css/js/img
    * 因为上面配置了`DispatcherServlet`，将它的`<url-pattern>/</url-pattern>`设置为`/`，此时所有的静态资源都由`DispatcherServlet`处理
    * **加上`<mvc:default-servlet-handler/>`**
    * 如果`DispatcherServlet`处理不了，由`default-servlet`处理

```xml
<!-- 自动扫描包 -->
<context:component-scan base-package="com.atguigu.mvc.controller"/>

<!-- 配置Thymeleaf视图解析器 -->
<bean id="templateResolver" class="org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver">
    <property name="prefix" value="/WEB-INF/templates/"></property>
    <property name="suffix" value=".html"></property>
    <property name="characterEncoding" value="UTF-8"></property>
    <property name="templateMode" value="HTML5"></property>
</bean>
<bean id="springTemplateEngine" class="org.thymeleaf.spring5.SpringTemplateEngine">
    <property name="templateResolver" ref="templateResolver"></property>
</bean>
<bean class="org.thymeleaf.spring5.view.ThymeleafViewResolver">
    <property name="order" value="1"></property>
    <property name="characterEncoding" value="UTF-8"></property>
    <property name="templateEngine" ref="templateEngine"></property>
</bean>

<!-- 
   处理静态资源，例如html、js、css、jpg
  若只设置该标签，则只能访问静态资源，其他请求则无法访问
  此时必须设置<mvc:annotation-driven/>解决问题
 -->
<mvc:default-servlet-handler/>

<!-- 开启mvc注解驱动 -->
<mvc:annotation-driven>
    <mvc:message-converters>
        <!-- 处理响应中文内容乱码 -->
        <bean class="org.springframework.http.converter.StringHttpMessageConverter">
            <property name="defaultCharset" value="UTF-8" />
            <property name="supportedMediaTypes">
                <list>
                    <value>text/html</value>
                    <value>application/json</value>
                </list>
            </property>
        </bean>
    </mvc:message-converters>
</mvc:annotation-driven>
```

### thymeleaf的使用

* 在html的标签上加上thymeleaf的命名空间
* `<html lang="en" xmlns:th="http://www.thymeleaf.org">`

#### 语法

* `th:href:"@{/hello}"`其中`/`表示为上下文路径
* `th:href="@{/testParam(username='admin',password=123456)}`设置了两个请求参数
* 从域中取参数
    * `<div th:text="${key}"></div>`从request域中取数据，内容放入div标签中，`key`为域键
    * `<div th:text="${session.sessionScopeKey}"></div>`从session域中取数据
    * `<div th:text="${application.applicationScopeKey}"></div>`从application域中取数据
* `<tr th:each="employee : ${employees}">`foreach遍历
    * `<td th:text="${employee.id}"></td>`
    * `<td th:text="${employee.lastName}"></td>`
* `th:action="@{/employee/} + ${employee.id}"`url拼接
    * `th:action="@{'/employee/' + ${employee.id}}"`这样也行
* `th:field="${employee.gender}`属性赋值（单选框）
* 在js中获取上下文路径
    * 在js标签添加`th:inline="javascript"`属性
    * `var ctxPath1 = [[@{/}]];`
    * `var ctxPath2 = /*[[@{/}]]*/'';`
    * `var ctxPath3 = [[${#httpServletRequest.getContextPath()}]];`
    * 都是**字符串类型**，不同的是前两个有两个`/`，第三个没有后边`/`
    * `var ctxPath1 = "/SpringMVCTest03/";`
    * `var ctxPath2 = "/SpringMVCTest03/";`
    * `var ctxPath3 = "/SpringMVCTest03";`

## @RequestMapping注解

### 功能

* `@RequestMapping`注解的作用就是将请求和处理请求的控制器方法关联起来，建立映射关系。
* SpringMVC 接收到指定的请求，就会来找到在映射关系中对应的控制器方法来处理这个请求。

### 位置

* `@RequestMapping`标识一个类：设置映射请求的请求路径的初始信息
* `@RequestMapping`标识一个方法：设置映射请求请求路径的具体信息

```java
@Controller
@RequestMapping("/test")
public class RequestMappingController {

	//此时请求映射所映射的请求的请求路径为：/test/testRequestMapping
    @RequestMapping("/testRequestMapping")
    public String testRequestMapping(){
        return "success";
    }

}
```

### value属性

* 通过请求的匹配请求映射
* **字符串数组**类型，该请求映射有多少个请求地址对应
* **必需设置项**

```java
@RequestMapping(
        value = {"/testRequestMapping", "/test"}
)
public String testRequestMapping(){
    return "success";
}
```

### method属性

* 通过**请求方式**匹配请求映射
* GET、POST、PUT、DELETE
* 枚举数组
* 若当前请求的请求地址满足请求映射的value属性，但是请求方式不满足method属性，则浏览器报错`405：Request method 'POST' not supported`

```java
@RequestMapping(
        value = {"/testRequestMapping", "/test"},
        method = {RequestMethod.GET, RequestMethod.POST}
)
public String testRequestMapping(){
    return "success";
}
```
#### 派生注解

* 处理get请求的映射-->@GetMapping
* 处理post请求的映射-->@PostMapping
* 处理put请求的映射-->@PutMapping
* 处理delete请求的映射-->@DeleteMapping

### params属性*

* 过请求的请求参数匹配请求映射
* 字符串类型的数组
* 可以通过四种表达式设置请求参数和请求映射的匹配关系
* `"param"`：要求请求映射所匹配的请求必须携带param请求参数
* `"!param"`：要求请求映射所匹配的请求必须不能携带param请求参数
* `"param=value"`：要求请求映射所匹配的请求必须携带param请求参数且param=value
* `"param!=value"`：要求请求映射所匹配的请求必须携带param请求参数但是param!=value

```java
@RequestMapping(
        value = {"/testRequestMapping", "/test"}
        ,method = {RequestMethod.GET, RequestMethod.POST}
        ,params = {"username","password!=123456"}
)
public String testRequestMapping(){
    return "success";
}
```

* 若当前请求满足@RequestMapping注解的value和method属性，但是不满足params属性，此时页面回报错400：Parameter conditions "username, password!=123456" not met for actual request parameters: username={admin}, password={123456}

### headers属性*

* 通过请求的请求头信息匹配请求映射
* 字符串类型的数组
* 可以通过四种表达式设置请求头信息和请求映射的匹配关系
* `"header"`：要求请求映射所匹配的请求必须携带header请求头信息
* `"!header"`：要求请求映射所匹配的请求必须不能携带header请求头信息
* `"header=value"`：要求请求映射所匹配的请求必须携带header请求头信息且header=value
* `"header!=value"`：要求请求映射所匹配的请求必须携带header请求头信息且header!=value
* 若当前请求满足@RequestMapping注解的value和method属性，但是不满足headers属性，此时页面显示404错误，即资源未找到

### ant风格的路径(通配符)

* `?`：表示任意的单个字符
* `*`：表示任意的0个或多个字符
* `**`：表示任意的一层或多层目录
    * **注意**：在使用`**`时，只能使用`/**/xxx`的方式

### 路径占位符


* 原始方式：/deleteUser?id=1
* rest方式：/deleteUser/1
* @RequestMapping注解的value属性中通过占位符{xxx}表示传输的数据
* 通过@PathVariable注解，将占位符所表示的数据赋值给控制器方法的形参

```html
<a th:href="@{/testrest/1/admin}">testrest</a>
```

```java
@RequestMapping("/testrest/{id}/{username}")
public String testrest(
        @PathVariable("id")
        Integer id,
        @PathVariable("username")
        String username
    ) {
    System.out.println("id===>" + id);
    System.out.println("username===>" + username);
    return "success";
}
```

## 获取请求参数

### ServletAPI

```java
@RequestMapping("/testParam")
public String testParam(HttpServletRequest request){
    String username = request.getParameter("username");
    String password = request.getParameter("password");
    System.out.println("username:"+username+",password:"+password);
    return "success";
}
```

### 控制器方法形参

* 在控制器方法的形参位置，设置和请求参数同名的形参，当浏览器发送请求，匹配到请求映射时，在DispatcherServlet中就会将请求参数赋值给相应的形参
* 若请求所传输的请求参数中有多个同名的请求参数，此时可以在控制器方法的形参中设置字符串数组或者字符串类型的形参接收此请求参数
    * 若使用**字符串数组**类型的形参，此参数的数组中包含了每一个数据
    * 若使用**字符串**类型的形参，此参数的值为每个数据中间使用逗号拼接的结果

```java
@RequestMapping(value = "/testParam",method = RequestMethod.GET)
public String testParam(String username,String password,String[] hobby) {
    System.out.println("username=>" + username);
    System.out.println("password=>" + password);
    System.out.println(Arrays.toString(hobby));
    return "success";
}
```

### @RequestParam

* 将**请求参数**和控制器**方法的形参**创建映射关系
* `value`：指定为形参赋值的请求参数的参数名
* `required`：设置是否必须传输此请求参数，默认值为true
    * 如果required设置为true，没有传入相应的请求参数，报404错误
* `defaultValue`：不管required属性值为true或false，当value所指定的请求参数没有传输或传输的值为""时，则使用默认值为形参赋值


```java
@RequestMapping("/testRequestParam")
public String testRequestParam(
        @RequestParam(value = "username",required = true,defaultValue = "admin")
        String uname,
        @RequestParam("password")
        String passwd,
        @RequestParam("hobby")
        String[] hobby
) {

    System.out.println("username=>"+uname);
    System.out.println("password=>"+passwd);
    System.out.println("hobby=>"+Arrays.toString(hobby));

    return "success";
}
```

### @RequestHeader

@RequestHeader是将请求头信息和控制器方法的形参创建映射关系

@RequestHeader注解一共有三个属性：value、required、defaultValue，用法同@RequestParam

### @CookieValue

@CookieValue是将cookie数据和控制器方法的形参创建映射关系

@CookieValue注解一共有三个属性：value、required、defaultValue，用法同@RequestParam

### 获取请求参数对象

* 控制器方法形参设置为一个实例对象
* 如果请求参数列表和实例对象的属性名称一致
* 请求参数会为此属性赋值
* `http://localhost:8080/SpringMVCTest01/testParamPojo?id=10001&username=admin&sex=男`

```java
public class User {
    private String id;
    private String username;
    private String sex;
    
    /*
        construstor
        getter
        setter
        tostring
    */
}
```

```java
@RequestMapping("/testParamPojo")
public String testParamPojo(User user) {

    System.out.println(user);

    return "success";
}
```

### 请求参数乱码

* web.xml
* SpringMVC中处理编码的过滤器一定要配置到其他过滤器之前，否则无效


```xml
<!--配置springMVC的编码过滤器-->
<filter>
    <filter-name>CharacterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
        <param-name>encoding</param-name>
        <param-value>UTF-8</param-value>
    </init-param>
    <init-param>
        <param-name>forceResponseEncoding</param-name>
        <param-value>true</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>CharacterEncodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

## 域对象数据共享

### request

#### ServletAPI

```java
@RequestMapping("/testServletAPI")
public String testServletAPI(HttpServletRequest request){
    request.setAttribute("testScope", "hello,servletAPI");
    return "success";
}
```

#### ModelAndView

```java
@RequestMapping(value = "/testModelAndView",method = RequestMethod.GET)
public ModelAndView testModelAndView() {
    ModelAndView modelAndView = new ModelAndView();

    modelAndView.addObject("key","modelandview");
    modelAndView.setViewName("success/success");
    return modelAndView;
}
```

#### Model

```java
@RequestMapping(value = "/testModel",method = RequestMethod.GET)
public String testModel(Model model) {

    model.addAttribute("key","model");

    return "success/success";
}
```
#### Map

```java
@RequestMapping(value = "/testMap",method = RequestMethod.GET)
public String testMap(Map<String,Object> map) {
    map.put("key","map");
    return "success/success";
}
```

#### ModelMap

```java
@RequestMapping(value = "/testModelMap",method = RequestMethod.GET)
public String testModelMap(ModelMap modelMap) {
    modelMap.addAttribute("key","modelmap");
    return "success/success";
}
```

#### Model、ModelMap、Map的关系

* Model、ModelMap、Map类型的参数其实本质上都是 BindingAwareModelMap 类型的

```java
public interface Model{}
public class ModelMap extends LinkedHashMap<String, Object> {}
public class ExtendedModelMap extends ModelMap implements Model {}
public class BindingAwareModelMap extends ExtendedModelMap {}
```

### session

```java
@RequestMapping(value = "/testSession",method = RequestMethod.GET)
public String testSession(HttpSession session) {
    session.setAttribute("sessionScopeKey","sessionScopeValue");
    return "success/success";
}
```

### application

```java
@RequestMapping("/testApplication")
public String testApplication(HttpSession session){
	ServletContext application = session.getServletContext();
    application.setAttribute("testApplicationScope", "hello,application");
    return "success";
}
```


## 视图

* SpringMVC中的视图是**View接口**，视图的作用渲染数据，将模型Model中的数据展示给用户
* SpringMVC视图的种类很多，默认有转发视图和重定向视图
* 当工程引入jstl的依赖，转发视图会自动转换为JstlView
* 若使用的视图技术为Thymeleaf，在SpringMVC的配置文件中配置了Thymeleaf的视图解析器，由此视图解析器解析之后所得到的是ThymeleafView

### ThymeleafView

* 视图解析器通过，视图前缀和视图后缀，拼接而成的最终路径，是通过转发的形式跳转的。

![](img/img002.png)

### 转发视图

* SpringMVC的转发视图是InternalResourceView
* 当控制器方法设置的视图名称以`forward:`开头，此时路径不会以视图解析器解析，而是会将`forward:`去掉，剩余部分以转发的形式跳转

```java
@RequestMapping("/testForward")
public String testForward() {
    return "forward:/success";
}
```

### 重定向视图

* 重定向视图是RedirectView
* 视图名称以`redirect:`开头

```java
@RequestMapping("/testRedirect")
public String testRedirect() {
    return "redirect:/success";
}
```

### 视图控制器view-controller配置

* 当控制器方法没有任何操作时，仅仅用来页面跳转
* 可以用注解的方式实现
* **当SpringMVC中设置任何一个view-controller时，其他控制器中的请求映射将全部失效，此时需要在SpringMVC的核心配置文件中设置开启mvc注解驱动的标签**

```xml
<mvc:annotation-driven></mvc:annotation-driven>

<mvc:view-controller path="/" view-name="index"></mvc:view-controller>
```

## RESTful

* HTTP 协议里面，四个表示操作方式的动词：GET、POST、PUT、DELETE。
* 它们分别对应四种基本操作：
    * GET 用来获取资源
    * POST 用来新建资源
    * PUT 用来更新资源
    * DELETE 用来删除资源。
* REST 风格提倡 URL 地址使用统一的风格设计，从前到后各个单词使用斜杠分开，将要发送给服务器的数据作为 URL 地址的一部分，以保证整体风格的一致性。



| 操作     | 传统方式         | REST风格                |
| -------- | ---------------- | ----------------------- |
| 查询操作 | getUserById?id=1 | user/1-->get请求方式    |
| 保存操作 | saveUser         | user-->post请求方式     |
| 删除操作 | deleteUser?id=1  | user/1-->delete请求方式 |
| 更新操作 | updateUser       | user-->put请求方式      |

### HiddenHttpMethodFilter

* SpringMVC 提供了 **HiddenHttpMethodFilter** 帮助我们**将 POST 请求转换为 DELETE 或 PUT 请求**
* 设置put和delete请求的方式
    * 当前请求为POST请求
    * 必须传输参数_method
        * _method的值为最终的请求方式
* 在配置web.xml时，要先配置CharacterEncodingFilter

web.xml

```xml
<filter>
    <filter-name>HiddenHttpMethodFilter</filter-name>
    <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
</filter>
<filter-mapping>
    <filter-name>HiddenHttpMethodFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

## HttpMessageConverter


* `HttpMessageConverter`，报文信息转换器，将请求报文转换为Java对象，或将Java对象转换为响应报文
* `HttpMessageConverter`提供了两个注解和两个类型：
    * @RequestBody
    * @ResponseBody
    * RequestEntity
    * ResponseEntity

### @RequestBody

* 位置：控制器方法的形参上
* 获取请求体
* 没有请求体 会报400错误
* 只有post请求有请求体
* `key=value&key=value&key=value&key=value`

```java
@RequestMapping("/testRequestBody")
public String testRequestBody(
        @RequestBody
        String requestBody,
) {
    System.out.println(requestBody);
    return "success";
}
```

### RequestEntity

* 获取请求报文
* 方法形参

```java
@RequestMapping("/testRequestEntity")
public String testRequestEntity(RequestEntity<String> requestEntity) {
    System.out.println(requestEntity);
    return "success";
}
```

### @ResponseBody

* 输出响应数据
* 位置：方法
* 用了这个注解后，方法最后return的数据直接输出在页面上

```java
@RequestMapping("/testResponseBody")
@ResponseBody
public String testResponseBody() {
    return "testResponseBody";
}
```

#### json

* 一般用`@ResponseBody`注解来输出json数据，前端通过请求拿到数据，渲染页面
* 导入jackson依赖
    * 直接使用jackson（在SpringMVC不需要这么做）
    * `Object o = new ObjectMapper().readValue("json", Class<T> valueType);`JSON字符串转对象
    * `String json = new ObjectMapper().writeValueAsString(对象);`对象转成JSON字符串
* 在SpringMVC的核心配置文件中开启mvc的注解驱动，此时在HandlerAdaptor中会自动装配一个消息转换器：MappingJackson2HttpMessageConverter，可以将响应到浏览器的Java对象转换为Json格式的字符串
* 将对象直接返回
    * 对象-->json对象
    * list集合-->json数组
    * map集合-->json对象
* `@JsonFormat`出参日期格式化
    * `@JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")`
* `@DateTimeFormat`入参日期格式化
    * `@DateTimeFormat(pattern = "yyyy-MM-dd")`
    * 这个注解不是jackson的，这个是spring的注解

```xml
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.12.1</version>
</dependency>
```

```xml
<mvc:annotation-driven />
```

```java
@RequestMapping("/testResponseBodyJson")
@ResponseBody
public List<User> testResponseBodyJson() {
    List<User> users = new ArrayList<User>();

    users.add(new User(1,"张三","男",18));
    users.add(new User(2,"李四","女",21));
    users.add(new User(3,"王五","男",19));
    users.add(new User(4,"赵六","女",20));
    users.add(new User(5,"哈哈","男",100));

    return users;
}
```

#### ajax

```html
<button id="btn">获取学生信息</button>
<table border="1" cellpadding="0" cellspacing="0" id="info"></table>
<script type="text/javascript" th:inline="javascript">
    $("#btn").on("click",function () {
        var url = [[${#httpServletRequest.getContextPath()}]] + "/testResponseBodyJson";
        $.ajax({
            url:url,
            dataType: "json",
            type: "get",
            success: function (data) {
                var html = "";
                html += "<tr>";
                html += "<td>编号</td>";
                html += "<td>姓名</td>";
                html += "<td>性别</td>";
                html += "<td>年龄</td>";
                html += "</tr>";
                for (let i = 0; i < data.length; i++) {
                    html += "<tr>";
                    html += "<td>" + data[i].id + "</td>";
                    html += "<td>" + data[i].username + "</td>";
                    html += "<td>" + data[i].sex + "</td>";
                    html += "<td>" + data[i].age + "</td>";
                    html += "</tr>";
                }
                $("#info").html(html);
            },
            error: function (errorMsg) {
                console.log(errorMsg);
            }
        })
    })
</script>
```

```java

```

### @RestController注解

@RestController注解是springMVC提供的一个复合注解，标识在控制器的类上，就相当于为类添加了@Controller注解，并且为其中的每个方法添加了@ResponseBody注解

### ResponseEntity

* ResponseEntity用于控制器方法的返回值类型，该控制器方法的返回值就是**响应到浏览器的响应报文**

## 文件上传与下载

### 文件下载

```java
    @RequestMapping("download")
    public ResponseEntity<byte[]> fileDownload(HttpSession session) throws IOException {
//      获取文件上传的流
        InputStream is = session.getServletContext().getResourceAsStream("/file/maven.zip");
//      创建数组，把文件放入
        byte[] bytes = new byte[is.available()];
        is.read(bytes);
//      响应头
        MultiValueMap<String, String> headers = new HttpHeaders();
//      设置响应头，表示下载文件
        headers.add("Content-Disposition","attachment;filename="+ URLEncoder.encode("哈哈.zip","UTF-8"));
//      设置响应码
        HttpStatus status = HttpStatus.OK;
//      响应头对象
        ResponseEntity<byte[]> responseEntity = new ResponseEntity<byte[]>(bytes,headers,status);
        is.close();

        return responseEntity;
    }

}
```

### 文件上传

* 表单方式为`post`，设置`enctype="multipart/form-data"`，`input`类型为`file`，
* 导入commons-fileupload依赖
* 创建bean对象`CommonsMultipartResolver`，并且id为`multipartResolver`

```xml
<dependency>
    <groupId>commons-fileupload</groupId>
    <artifactId>commons-fileupload</artifactId>
    <version>1.4</version>
</dependency>
```

```xml
<bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver"></bean>
```

```java
@RequestMapping(value = "/upload",method = RequestMethod.POST)
public String fileUpload(MultipartFile file,HttpSession session) throws IOException {
//        获取文件要存入的路径
    String realPath = session.getServletContext().getRealPath("/file");
//      文件路径拼接
    String path = realPath + File.separator + file.getOriginalFilename();
//      文件上传
    file.transferTo(new File(path));

    return "success";
}

```

## 拦截器

* 拦截器用于拦截控制方法的执行
* 拦截器要实现`HandlerInterceptor`接口
* 要在xml文件中配置


* 对DispatcherServlet所有的请求拦截

```xml
// 1
<bean class="com.atguigu.interceptor.FirstInterceptor"></bean>
// 2
<ref bean="firstInterceptor"></ref>
```

* 对某个请求拦截
* `<bean>`和`<ref>`设置拦截器
* `<mvc:mapping>`设置要拦截的请求
* `<mvc:exclude-mapping path="/download"/>` 排除的请求

```xml
<mvc:interceptors>
    <mvc:interceptor>
        <mvc:mapping path="/" />
        <mvc:exclude-mapping path="/download"/>
        <bean class="com.example.interceptor.FirstInterceptor"></bean>
    </mvc:interceptor>
</mvc:interceptors>
```

### 拦截器的三个方法

* `preHandle`：**控制器方法执行之前**执行preHandle()，
    * 返回值true为放行，即调用控制器方法；
    * 返回false表示拦截，即不调用控制器方法
* `postHandle`：控制器方法执行之后执行postHandle()
* `afterComplation`：处理完视图和模型数据，渲染视图完毕之后执行afterComplation()

### 多个拦截执行顺序

* 若每个拦截器的preHandle()都返回true
    * 此时多个拦截器的执行顺序和拦截器在SpringMVC的配置文件的**配置顺序**有关：
    * preHandle()会按照配置的**顺序执行**，
    * postHandle()和afterComplation()会按照配置的**反序执行**
* 若某个拦截器的preHandle()返回了false
    * preHandle()返回false和它之前的拦截器的preHandle()都会执行
    * postHandle()都不执行
    * 返回false的拦截器之前的拦截器的afterComplation()会执行

## 异常处理器

### xml配置

* SpringMVC提供了一个处理控制器方法执行过程中所出现的异常的接口：HandlerExceptionResolver
* HandlerExceptionResolver接口的实现类有：DefaultHandlerExceptionResolver和SimpleMappingExceptionResolver

```xml
<bean class="org.springframework.web.servlet.handler.SimpleMappingExceptionResolver">
    <property name="exceptionMappings">
        <props>
            <!--设置具体的某个异常，并设置要跳转的页面-->
            <prop key="java.lang.ArithmeticException">404</prop>
        </props>
    </property>
    <!-- 把异常信息保存到域中-->
    <property name="exceptionAttribute" value="errorMsg"></property>
</bean>
```

### 注解

* `@ControllerAdvice`将当前类标识为异常处理的组件
    * `@RestControllerAdvice`相当于方法都是接口
* `@ExceptionHandler`标识方法所处理的异常类型
* 发生异常时会把对应异常对象传进方法

```java
@ControllerAdvice
public class ExceptionController {
    @ExceptionHandler(value = ArithmeticException.class)
    public String exception405(Exception errorMsg, Model model) {
    
        model.addAttribute("errorMsg",errorMsg);
    
        return "404";
    }
}
```

## 全注解配置

### 初始化类

* 当我们的类扩展了`AbstractAnnotationConfigDispatcherServletInitializer`并将其部署到**Servlet3.0**容器的时候，容器会自动发现它，并用它来配置Servlet上下文。

```java
public class WebInit extends AbstractAnnotationConfigDispatcherServletInitializer {
    protected Class<?>[] getRootConfigClasses() {
        return new Class[]{ SpringConfig.class }; // spring的配置文件
    }

    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{ MvcConfig.class }; // springmvc的配置文件
    }

    protected String[] getServletMappings() {
        return new String[] { "/" }; // DispatcherServlet的映射规则
    }

    @Override
    protected Filter[] getServletFilters() {
        CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
        characterEncodingFilter.setEncoding("UTF-8");
        characterEncodingFilter.setForceResponseEncoding(true);
        HiddenHttpMethodFilter hiddenHttpMethodFilter = new HiddenHttpMethodFilter();
        return new Filter[]{ characterEncodingFilter,hiddenHttpMethodFilter };
    }
}
```

### springmvc配置

```java

@Configuration
@ComponentScan("com.example")
@EnableWebMvc
public class MvcConfig implements WebMvcConfigurer {

//    默认资源
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }
//  视图控制器
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("index");
    }
//    文件上传
    @Bean
    public CommonsMultipartResolver multipartResolver() {
        return new CommonsMultipartResolver();
    }
//   添加拦截器
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new FirstInterceptor()).addPathPatterns("/**");
    }

    //   异常处理器
    public void configureHandlerExceptionResolvers(List<HandlerExceptionResolver> resolvers) {
        SimpleMappingExceptionResolver mappingExceptionResolver = new SimpleMappingExceptionResolver();
        Properties properties = new Properties();
        properties.setProperty("java.lang.ArithmeticException","404");
        mappingExceptionResolver.setExceptionMappings(properties);
        mappingExceptionResolver.setExceptionAttribute("errorMsg");
        resolvers.add(mappingExceptionResolver);
    }

    //配置生成模板解析器
    @Bean
    public ITemplateResolver templateResolver() {
        WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();
        // ServletContextTemplateResolver需要一个ServletContext作为构造参数，可通过WebApplicationContext 的方法获得
        ServletContextTemplateResolver templateResolver = new ServletContextTemplateResolver(
                webApplicationContext.getServletContext());
        templateResolver.setPrefix("/WEB-INF/templates/");
        templateResolver.setSuffix(".html");
        templateResolver.setCharacterEncoding("UTF-8");
        templateResolver.setTemplateMode(TemplateMode.HTML);
        return templateResolver;
    }

    //生成模板引擎并为模板引擎注入模板解析器
    @Bean
    public SpringTemplateEngine templateEngine(ITemplateResolver templateResolver) {
        SpringTemplateEngine templateEngine = new SpringTemplateEngine();
        templateEngine.setTemplateResolver(templateResolver);
        return templateEngine;
    }

    //生成视图解析器并未解析器注入模板引擎
    @Bean
    public ViewResolver viewResolver(SpringTemplateEngine templateEngine) {
        ThymeleafViewResolver viewResolver = new ThymeleafViewResolver();
        viewResolver.setCharacterEncoding("UTF-8");
        viewResolver.setTemplateEngine(templateEngine);
        return viewResolver;
    }

}

```


## SpringMVC执行流程

![](img/20220429112109.png)

### SpringMVC常用组件

* DispatcherServlet：**前端控制器**，不需要工程师开发，由框架提供
    * 作用：统一处理请求和响应，整个流程控制的中心，由它调用其它组件处理用户的请求
* HandlerMapping：**处理器映射器**，不需要工程师开发，由框架提供
    * 作用：根据请求的url、method等信息查找Handler，即控制器方法
* Handler：**处理器**，需要工程师开发
    * 作用：在DispatcherServlet的控制下Handler对具体的用户请求进行处理
* HandlerAdapter：**处理器适配器**，不需要工程师开发，由框架提供
    * 作用：通过HandlerAdapter对处理器（控制器方法）进行执行
* ViewResolver：**视图解析器**，不需要工程师开发，由框架提供
    * 作用：进行视图解析，得到相应的视图，例如：ThymeleafView、InternalResourceView、RedirectView
* View：**视图**
    * 作用：将模型数据通过页面展示给用户

### DispatcherServlet初始化过程

DispatcherServlet 本质上是一个 Servlet，所以天然的遵循 Servlet 的生命周期。所以宏观上是 Servlet 生命周期来进行调度。

![images](img/img005.png)

#### 初始化WebApplicationContext

所在类：org.springframework.web.servlet.FrameworkServlet

```java
protected WebApplicationContext initWebApplicationContext() {
    WebApplicationContext rootContext =
        WebApplicationContextUtils.getWebApplicationContext(getServletContext());
    WebApplicationContext wac = null;

    if (this.webApplicationContext != null) {
        // A context instance was injected at construction time -> use it
        wac = this.webApplicationContext;
        if (wac instanceof ConfigurableWebApplicationContext) {
            ConfigurableWebApplicationContext cwac = (ConfigurableWebApplicationContext) wac;
            if (!cwac.isActive()) {
                // The context has not yet been refreshed -> provide services such as
                // setting the parent context, setting the application context id, etc
                if (cwac.getParent() == null) {
                    // The context instance was injected without an explicit parent -> set
                    // the root application context (if any; may be null) as the parent
                    cwac.setParent(rootContext);
                }
                configureAndRefreshWebApplicationContext(cwac);
            }
        }
    }
    if (wac == null) {
        // No context instance was injected at construction time -> see if one
        // has been registered in the servlet context. If one exists, it is assumed
        // that the parent context (if any) has already been set and that the
        // user has performed any initialization such as setting the context id
        wac = findWebApplicationContext();
    }
    if (wac == null) {
        // No context instance is defined for this servlet -> create a local one
        // 创建WebApplicationContext
        wac = createWebApplicationContext(rootContext);
    }

    if (!this.refreshEventReceived) {
        // Either the context is not a ConfigurableApplicationContext with refresh
        // support or the context injected at construction time had already been
        // refreshed -> trigger initial onRefresh manually here.
        synchronized (this.onRefreshMonitor) {
            // 刷新WebApplicationContext
            onRefresh(wac);
        }
    }

    if (this.publishContext) {
        // Publish the context as a servlet context attribute.
        // 将IOC容器在应用域共享
        String attrName = getServletContextAttributeName();
        getServletContext().setAttribute(attrName, wac);
    }

    return wac;
}
```

#### 创建WebApplicationContext

所在类：org.springframework.web.servlet.FrameworkServlet

```java
protected WebApplicationContext createWebApplicationContext(@Nullable ApplicationContext parent) {
    Class<?> contextClass = getContextClass();
    if (!ConfigurableWebApplicationContext.class.isAssignableFrom(contextClass)) {
        throw new ApplicationContextException(
            "Fatal initialization error in servlet with name '" + getServletName() +
            "': custom WebApplicationContext class [" + contextClass.getName() +
            "] is not of type ConfigurableWebApplicationContext");
    }
    // 通过反射创建 IOC 容器对象
    ConfigurableWebApplicationContext wac =
        (ConfigurableWebApplicationContext) BeanUtils.instantiateClass(contextClass);

    wac.setEnvironment(getEnvironment());
    // 设置父容器
    wac.setParent(parent);
    String configLocation = getContextConfigLocation();
    if (configLocation != null) {
        wac.setConfigLocation(configLocation);
    }
    configureAndRefreshWebApplicationContext(wac);

    return wac;
}
```

#### DispatcherServlet初始化策略

FrameworkServlet创建WebApplicationContext后，刷新容器，调用onRefresh(wac)，此方法在DispatcherServlet中进行了重写，调用了initStrategies(context)方法，初始化策略，即初始化DispatcherServlet的各个组件

所在类：org.springframework.web.servlet.DispatcherServlet

```java
protected void initStrategies(ApplicationContext context) {
   initMultipartResolver(context);
   initLocaleResolver(context);
   initThemeResolver(context);
   initHandlerMappings(context);
   initHandlerAdapters(context);
   initHandlerExceptionResolvers(context);
   initRequestToViewNameTranslator(context);
   initViewResolvers(context);
   initFlashMapManager(context);
}
```

### DispatcherServlet调用组件处理请求

#### processRequest()

FrameworkServlet重写HttpServlet中的service()和doXxx()，这些方法中调用了processRequest(request, response)

所在类：org.springframework.web.servlet.FrameworkServlet

```java
protected final void processRequest(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {

    long startTime = System.currentTimeMillis();
    Throwable failureCause = null;

    LocaleContext previousLocaleContext = LocaleContextHolder.getLocaleContext();
    LocaleContext localeContext = buildLocaleContext(request);

    RequestAttributes previousAttributes = RequestContextHolder.getRequestAttributes();
    ServletRequestAttributes requestAttributes = buildRequestAttributes(request, response, previousAttributes);

    WebAsyncManager asyncManager = WebAsyncUtils.getAsyncManager(request);
    asyncManager.registerCallableInterceptor(FrameworkServlet.class.getName(), new RequestBindingInterceptor());

    initContextHolders(request, localeContext, requestAttributes);

    try {
		// 执行服务，doService()是一个抽象方法，在DispatcherServlet中进行了重写
        doService(request, response);
    }
    catch (ServletException | IOException ex) {
        failureCause = ex;
        throw ex;
    }
    catch (Throwable ex) {
        failureCause = ex;
        throw new NestedServletException("Request processing failed", ex);
    }

    finally {
        resetContextHolders(request, previousLocaleContext, previousAttributes);
        if (requestAttributes != null) {
            requestAttributes.requestCompleted();
        }
        logResult(request, response, failureCause, asyncManager);
        publishRequestHandledEvent(request, response, startTime, failureCause);
    }
}
```

#### doService()

所在类：org.springframework.web.servlet.DispatcherServlet

```java
@Override
protected void doService(HttpServletRequest request, HttpServletResponse response) throws Exception {
    logRequest(request);

    // Keep a snapshot of the request attributes in case of an include,
    // to be able to restore the original attributes after the include.
    Map<String, Object> attributesSnapshot = null;
    if (WebUtils.isIncludeRequest(request)) {
        attributesSnapshot = new HashMap<>();
        Enumeration<?> attrNames = request.getAttributeNames();
        while (attrNames.hasMoreElements()) {
            String attrName = (String) attrNames.nextElement();
            if (this.cleanupAfterInclude || attrName.startsWith(DEFAULT_STRATEGIES_PREFIX)) {
                attributesSnapshot.put(attrName, request.getAttribute(attrName));
            }
        }
    }

    // Make framework objects available to handlers and view objects.
    request.setAttribute(WEB_APPLICATION_CONTEXT_ATTRIBUTE, getWebApplicationContext());
    request.setAttribute(LOCALE_RESOLVER_ATTRIBUTE, this.localeResolver);
    request.setAttribute(THEME_RESOLVER_ATTRIBUTE, this.themeResolver);
    request.setAttribute(THEME_SOURCE_ATTRIBUTE, getThemeSource());

    if (this.flashMapManager != null) {
        FlashMap inputFlashMap = this.flashMapManager.retrieveAndUpdate(request, response);
        if (inputFlashMap != null) {
            request.setAttribute(INPUT_FLASH_MAP_ATTRIBUTE, Collections.unmodifiableMap(inputFlashMap));
        }
        request.setAttribute(OUTPUT_FLASH_MAP_ATTRIBUTE, new FlashMap());
        request.setAttribute(FLASH_MAP_MANAGER_ATTRIBUTE, this.flashMapManager);
    }

    RequestPath requestPath = null;
    if (this.parseRequestPath && !ServletRequestPathUtils.hasParsedRequestPath(request)) {
        requestPath = ServletRequestPathUtils.parseAndCache(request);
    }

    try {
        // 处理请求和响应
        doDispatch(request, response);
    }
    finally {
        if (!WebAsyncUtils.getAsyncManager(request).isConcurrentHandlingStarted()) {
            // Restore the original attribute snapshot, in case of an include.
            if (attributesSnapshot != null) {
                restoreAttributesAfterInclude(request, attributesSnapshot);
            }
        }
        if (requestPath != null) {
            ServletRequestPathUtils.clearParsedRequestPath(request);
        }
    }
}
```

#### doDispatch()

所在类：org.springframework.web.servlet.DispatcherServlet

```java
protected void doDispatch(HttpServletRequest request, HttpServletResponse response) throws Exception {
    HttpServletRequest processedRequest = request;
    HandlerExecutionChain mappedHandler = null;
    boolean multipartRequestParsed = false;

    WebAsyncManager asyncManager = WebAsyncUtils.getAsyncManager(request);

    try {
        ModelAndView mv = null;
        Exception dispatchException = null;

        try {
            processedRequest = checkMultipart(request);
            multipartRequestParsed = (processedRequest != request);

            // Determine handler for the current request.
            /*
            	mappedHandler：调用链
                包含handler、interceptorList、interceptorIndex
            	handler：浏览器发送的请求所匹配的控制器方法
            	interceptorList：处理控制器方法的所有拦截器集合
            	interceptorIndex：拦截器索引，控制拦截器afterCompletion()的执行
            */
            mappedHandler = getHandler(processedRequest);
            if (mappedHandler == null) {
                noHandlerFound(processedRequest, response);
                return;
            }

            // Determine handler adapter for the current request.
           	// 通过控制器方法创建相应的处理器适配器，调用所对应的控制器方法
            HandlerAdapter ha = getHandlerAdapter(mappedHandler.getHandler());

            // Process last-modified header, if supported by the handler.
            String method = request.getMethod();
            boolean isGet = "GET".equals(method);
            if (isGet || "HEAD".equals(method)) {
                long lastModified = ha.getLastModified(request, mappedHandler.getHandler());
                if (new ServletWebRequest(request, response).checkNotModified(lastModified) && isGet) {
                    return;
                }
            }
			
            // 调用拦截器的preHandle()
            if (!mappedHandler.applyPreHandle(processedRequest, response)) {
                return;
            }

            // Actually invoke the handler.
            // 由处理器适配器调用具体的控制器方法，最终获得ModelAndView对象
            mv = ha.handle(processedRequest, response, mappedHandler.getHandler());

            if (asyncManager.isConcurrentHandlingStarted()) {
                return;
            }

            applyDefaultViewName(processedRequest, mv);
            // 调用拦截器的postHandle()
            mappedHandler.applyPostHandle(processedRequest, response, mv);
        }
        catch (Exception ex) {
            dispatchException = ex;
        }
        catch (Throwable err) {
            // As of 4.3, we're processing Errors thrown from handler methods as well,
            // making them available for @ExceptionHandler methods and other scenarios.
            dispatchException = new NestedServletException("Handler dispatch failed", err);
        }
        // 后续处理：处理模型数据和渲染视图
        processDispatchResult(processedRequest, response, mappedHandler, mv, dispatchException);
    }
    catch (Exception ex) {
        triggerAfterCompletion(processedRequest, response, mappedHandler, ex);
    }
    catch (Throwable err) {
        triggerAfterCompletion(processedRequest, response, mappedHandler,
                               new NestedServletException("Handler processing failed", err));
    }
    finally {
        if (asyncManager.isConcurrentHandlingStarted()) {
            // Instead of postHandle and afterCompletion
            if (mappedHandler != null) {
                mappedHandler.applyAfterConcurrentHandlingStarted(processedRequest, response);
            }
        }
        else {
            // Clean up any resources used by a multipart request.
            if (multipartRequestParsed) {
                cleanupMultipart(processedRequest);
            }
        }
    }
}
```

#### processDispatchResult()

```java
private void processDispatchResult(HttpServletRequest request, HttpServletResponse response,
                                   @Nullable HandlerExecutionChain mappedHandler, @Nullable ModelAndView mv,
                                   @Nullable Exception exception) throws Exception {

    boolean errorView = false;

    if (exception != null) {
        if (exception instanceof ModelAndViewDefiningException) {
            logger.debug("ModelAndViewDefiningException encountered", exception);
            mv = ((ModelAndViewDefiningException) exception).getModelAndView();
        }
        else {
            Object handler = (mappedHandler != null ? mappedHandler.getHandler() : null);
            mv = processHandlerException(request, response, handler, exception);
            errorView = (mv != null);
        }
    }

    // Did the handler return a view to render?
    if (mv != null && !mv.wasCleared()) {
        // 处理模型数据和渲染视图
        render(mv, request, response);
        if (errorView) {
            WebUtils.clearErrorRequestAttributes(request);
        }
    }
    else {
        if (logger.isTraceEnabled()) {
            logger.trace("No view rendering, null ModelAndView returned.");
        }
    }

    if (WebAsyncUtils.getAsyncManager(request).isConcurrentHandlingStarted()) {
        // Concurrent handling started during a forward
        return;
    }

    if (mappedHandler != null) {
        // Exception (if any) is already handled..
        // 调用拦截器的afterCompletion()
        mappedHandler.triggerAfterCompletion(request, response, null);
    }
}
```

### SpringMVC的执行流程

1. 用户向服务器发送请求，请求被SpringMVC 前端控制器 DispatcherServlet捕获。
2. DispatcherServlet对请求URL进行解析，得到请求资源标识符（URI），判断请求URI对应的映射：
3. 不存在
    1. 再判断是否配置了mvc:default-servlet-handler
    2. 如果没配置，则控制台报映射查找不到，客户端展示404错误
    3. 如果有配置，则访问目标资源（一般为静态资源，如：JS,CSS,HTML），找不到客户端也会展示404错误
4. 存在则执行下面的流程
    1. 根据该URI，调用HandlerMapping获得该Handler配置的所有相关的对象（包括Handler对象以及Handler对象对应的拦截器），最后以HandlerExecutionChain执行链对象的形式返回。
    2. DispatcherServlet 根据获得的Handler，选择一个合适的HandlerAdapter。
    3. 如果成功获得HandlerAdapter，此时将开始执行拦截器的preHandler(…)方法【正向】
    4. 提取Request中的模型数据，填充Handler入参，开始执行Handler（Controller)方法，处理请求。在填充Handler的入参过程中，根据你的配置，Spring将帮你做一些额外的工作：
        1. HttpMessageConveter： 将请求消息（如Json、xml等数据）转换成一个对象，将对象转换为指定的响应信息
        1. 数据转换：对请求消息进行数据转换。如String转换成Integer、Double等
        1. 数据格式化：对请求消息进行数据格式化。 如将字符串转换成格式化数字或格式化日期等
        1. 数据验证： 验证数据的有效性（长度、格式等），验证结果存储到BindingResult或Error中
5. Handler执行完成后，向DispatcherServlet 返回一个ModelAndView对象。
6. 此时将开始执行拦截器的postHandle(...)方法【逆向】。
6. 根据返回的ModelAndView（此时会判断是否存在异常：如果存在异常，则执行HandlerExceptionResolver进行异常处理）选择一个适合的ViewResolver进行视图解析，根据Model和View，来渲染视图。
6. 渲染视图完毕执行拦截器的afterCompletion(…)方法【逆向】。
6. 将渲染结果返回给客户端。
























