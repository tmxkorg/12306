/**************设置说明**************
*设置举例，有4个#分割每一项，依次为“乘车日期#出发站#到达站#订何种票#座次要求#刷票时间间隔（秒）”，@后是当前#所代表项的备选项
*
*
* 举例一：
shezhi="2014-01-01#北京#成都#成人#硬卧#1.5";
* 举例二：
shezhi="2014-01-01@2014-1-2@2014-1-3#北京#成都#成人@学生#硬卧@硬座#0.5";
*
*
**************程序开始**************/

var shezhi=window.prompt('【设置说明】\n\n【关键】注意输入顺序、每个#分割的项可以用@添加备选\n【格式】乘车日期#出发站#到达站#订何种票#座次要求#刷票时间间隔(秒)\n【例1】2014-01-01#北京#成都#成人#硬卧#1.5\n【例2】2014-01-28@2014-1-2@2014-1-3#北京#成都#成人@学生#硬卧@硬座#0.5\n【请输入您的需求】',"2014-01-28@2014-1-29@2014-1-27#北京#成都#成人@学生#硬卧@硬座#0.5");
var xuanze=[];
var url=[];
piao={"软卧":"rw_num","硬卧":"yw_num","软座":"rz_num","硬座":"yz_num","无座":"wz_num","商务座":"swz_num","特等座":"tz_num","一等座":"zy_num","二等座":"ze_num","高级软卧":"gr_num","其他":"qt_num"};
for(var i=0;i<shezhi.split("#")[0].split("@").length;i++)
	for(var j=0;j<shezhi.split("#")[1].split("@").length;j++)
		for(var k=0;k<shezhi.split("#")[2].split("@").length;k++)
			for(var l=0;l<shezhi.split("#")[3].split("@").length;l++)
				for(var m=0;m<shezhi.split("#")[4].split("@").length;m++)
					xuanze.push(shezhi.split("#")[0].split("@")[i]+","+shezhi.split("#")[1].split("@")[j]+","+shezhi.split("#")[2].split("@")[k]+","+shezhi.split("#")[3].split("@")[l]+","+shezhi.split("#")[4].split("@")[m]);			
for(var i=0;i<xuanze.length;i++)
{
	url[i]='/otn/leftTicket/query?leftTicketDTO.train_date='+d(xuanze[i].split(",")[0])+'&leftTicketDTO.from_station='+p(xuanze[i].split(",")[1])[0]+'&leftTicketDTO.to_station='+p(xuanze[i].split(",")[2])[0]+'&purpose_codes='+(xuanze[i].split(",")[3]=="成人"?"ADULT":"0X00")+"#"+piao[xuanze[i].split(",")[4]]+"#"+xuanze[i].split(",")[4];
}

qp=new XMLHttpRequest();
function qiangpiao()
{
		var j=n=0;
		$('<div style="height:230px;padding:20px;"><textarea id="tmxk" style="width:100%;height:100%; background:url(http://tmxk.org/12306/h.png) no-repeat center;color:#53868B;; font-size:16px;padding:8px;"></textarea></div>').insertBefore($(".header"));		
		setInterval(function()
		{
			qp.open('GET',url[j].split("#")[0],false);
			qp.send();
			var s=eval("["+qp.responseText+"]")[0];
			for(var i=0;i<s.data.length;i++)
			if (s.data[i].queryLeftNewDTO[url[j].split("#")[1]]!="无" &&s.data[i].queryLeftNewDTO[url[j].split("#")[1]]!="--")
			{
				$("#tmxk").val(s.data[i].queryLeftNewDTO.from_station_name+"--到-->"+s.data[i].queryLeftNewDTO.to_station_name+"的"+url[j].split("#")[2]+"有："+(s.data[i].queryLeftNewDTO[url[j].split("#")[1]]=='有'?'多':'1')+"张\n"+$("#tmxk").val());
				n++;
			}
			j++;if (j==url.length) j=0;
			if (n>100) {$("#tmxk").val("");n=0;}
		}
		,parseInt(parseFloat(shezhi.split("#")[5])*1000));
}
function p(n){
	var q=station_names.split("@"),f=[];
	for(var i=1;i<q.length;i++) if (station_names.split("@")[i].split("|")[1].indexOf(n)!=-1) f.push(station_names.split("@")[i].split("|")[2]);
	return f; 
}
function d(t,f){;
	if (x=t.match(/\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}/)[1])
	{
		var s=t.split(x);
		if (t.length!=10)
		{
			s[0]=t.split(x)[0];
			s[1]=(t.split(x)[1].length!=2&&parseInt(t.split(x)[1])<10)?"0"+t.split(x)[1]:t.split(x)[1];
			s[2]=(t.split(x)[2].length!=2&&parseInt(t.split(x)[2])<10)?"0"+t.split(x)[2]:t.split(x)[2]; 
		}
     		return s.join(f||"-");
	}else alert("兄弟，你这智商,日期格式不对，能抢到票吗？！");
}

qiangpiao();
