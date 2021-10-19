# thunder
> 迅雷-下载系统

## 设计

### 表
- resource
- task

| 字段       | 类型   | 描述                      |
|------------|--------|-------------------------|
| id         | string | 唯一编号                  |
| url        | string | 资源原地址,严格保持原样   |
| path       | string | 下载存放路径,应保持等幂性 |
| type       | string | 资源类型. torrent,file    |
| status     | string | 任务状态                  |
| createdAt  | date   | 任务创建时间              |
| modifiedAt | date   | 任务修改时间              |

### 配置
- 并发数
- 重试次数

