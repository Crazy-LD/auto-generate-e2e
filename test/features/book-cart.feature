Feature: 测试登录
    Background:
        Given 跳转到['https://bookcart.azurewebsites.net']
        Then 点击元素['登录链接']
    Scenario Outline: 登录成功
        When 在['账号']中输入['<username>']
        When 在['密码']中输入['<password>']
        When 点击元素['登录']
        Then ['账户名']的文案包含['<username>']
        Then 点击元素['账户名']
        Then 点击元素['退出']


        Examples:
            | username | password  |
            | ortoni   | pass1234$ |
            | ortonikc | pass1234  |
