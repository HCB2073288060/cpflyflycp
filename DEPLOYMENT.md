# 部署指南

本指南将帮助您将大冒险转盘游戏部署到GitHub Pages，使其可以在线访问。

## 前提条件

在开始之前，您需要：

1. 一个GitHub账号
2. 已安装Git
3. 游戏代码已准备就绪

## 部署步骤

### 步骤1：创建GitHub仓库

1. 登录您的GitHub账号
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 为仓库命名（例如："truth-or-dare-spinner"）
4. 选择仓库可见性（公开或私有）
5. 勾选 "Initialize this repository with a README"
6. 点击 "Create repository"

### 步骤2：将本地代码推送到GitHub

在您的本地项目目录中执行以下命令：

```bash
# 初始化Git仓库（如果尚未初始化）
git init

# 添加远程仓库
git remote add origin https://github.com/您的用户名/仓库名称.git

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit"

# 推送到GitHub
git push -u origin main
```

### 步骤3：配置GitHub Pages

1. 在GitHub上打开您的仓库
2. 点击 "Settings" 选项卡
3. 在左侧菜单中选择 "Pages"
4. 在 "Source" 部分，从下拉菜单中选择分支（通常是 "main"）
5. 选择根目录（"/root"）
6. 点击 "Save"

### 步骤4：等待部署完成

GitHub Pages会自动构建并部署您的网站。这可能需要几分钟时间。部署完成后，您将在GitHub Pages设置页面看到一个URL，您可以通过该URL访问您的游戏。

## 自定义域名（可选）

如果您有自己的域名，您可以将其配置为指向您的GitHub Pages网站：

1. 在您的域名注册商处，添加一条CNAME记录，指向 `您的用户名.github.io`
2. 在GitHub仓库的根目录中创建一个名为 `CNAME` 的文件，内容为您的域名（例如：`yourdomain.com`）
3. 提交并推送此更改到GitHub
4. 在GitHub Pages设置中，输入您的自定义域名并保存

## 更新网站

要更新已部署的网站，只需将更改推送到GitHub仓库的相应分支，GitHub Pages会自动重新构建并部署您的网站。

```bash
# 添加更改的文件
git add .

# 提交更改
git commit -m "Update game"

# 推送到GitHub
git push
```

## 常见问题排查

1. **网站未显示**：确保您已正确配置GitHub Pages的源分支和目录，并等待足够的时间让GitHub完成部署。

2. **样式或脚本未加载**：检查文件路径是否正确，确保所有资源都已正确推送到GitHub。

3. **自定义域名不工作**：确保您的DNS记录已正确配置，并且DNS更改已传播（这可能需要24-48小时）。

4. **移动设备兼容性问题**：游戏已设计为响应式，但如果在某些设备上出现问题，请检查浏览器开发者工具中的控制台错误。

## 额外提示

- 定期备份您的代码和资源文件
- 考虑添加Google Analytics等工具来跟踪网站访问情况
- 收集用户反馈以改进游戏体验
- 定期更新任务内容以保持游戏的新鲜感