# 转盘扫描

```
npm i
npm run test <tagid>
```

<- GET https://app.bilibili.com/x/topic/web/details/top?topic_id=1002996

```
code	0
message	"0"
ttl	1
data	
    top_details	{…}
    functional_card	
        traffic_card	
            name	"今年定要闪闪发光"
            jump_url	"https://www.bilibili.com/blackboard/activity-oR6fcv8jFR.html"
            icon_url	"https://i0.hdslb.com/bfs…bcca1f6e1/vGqnSBjy8N.png"
            benefit_point	"十万大奖晒出闪光装备"
            card_desc	"2023-03-01 23:59截止"
            jump_title	"立即参加"
```

-> jump_url = https://www.bilibili.com/blackboard/activity-oR6fcv8jFR.html

<- GET https://www.bilibili.com/blackboard/activity-oR6fcv8jFR.html

```
..."lotteryId":"newLottery_cee0bddc-a142-11ed-9251-a4ae12675bc2"...
```

-> lotteryId = newLottery_cee0bddc-a142-11ed-9251-a4ae12675bc2
