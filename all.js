let agotashi_list = [['江戸巾着', '江户巾袋', 550], ['青竹たこつみれ', '青竹章鱼团子', 460], ['牛タンわさび', '牛舌（有芥末）', 580], ['牛すじ', '牛筋', 320], ['豚のミルフィーユ', '猪肉千层酥', 280],  ['たけのこ', '筍', 250],  ['大根', '萝卜', 240], ['ちくわぶ', '竹轮麸', 220], ['厚揚げ', '油豆腐', 220], ['玉子', '蛋', 200], ['こんにゃく', '魔芋', 200], ['がんもどき', '什锦豆腐丸', 200], ['さつま揚げ', '甜不辣', 200],  ['白滝', '魔芋丝', 200], ['はんぺん', '魚板', 200], ['ホタテ貝', '扇贝', 280],['餅巾着', '麻糬福袋', 250],['高野豆腐', '高野豆腐', 200],['結び昆布', '昆布', 200],['ちくわ', '竹轮', 200],['厚揚げ玉子', '日式蛋卷', 240]]


let toridashi_list = [['骨付き鶏', '雞腿（有附骨）', 980], ['トマト', '番茄', 380], ['牛タンつみれ', '牛舌团子', 300], ['ロールキャベツ', '高丽菜卷', 280], ['豚ネギ巻き', '猪肉葱卷', 280], ['焼売', '烧卖', 280], ['玉葱', '洋葱', 280], ['じゃがバター', '奶油土豆', 250], ['空心菜', '空心菜', 240], ['ヤングコーン', '嫩玉米', 200]]

let agemono_list = [['ちくわ磯辺揚げ','炸竹轮',420],['たこ唐','炸章鱼',580],['とり天','鸡肉天妇罗',380]]

let otsumami_list = [['たこ刺し', '章鱼刺身', 580], ['肉味噌ピーマン', '肉味噌青椒', 430], ['なめろう', '味噌剁碎鱼刺身', 480], ['鴨燻製', '烟熏鸭', 480], ['ポテトサラダ', '薯仔沙拉', 480], ['板わさ', '	芥末魚板', 480], ['辛子明太子', '辣明太子', 380], ['烏賊塩辛', '墨鱼盐渍', 380],  ['きゅうり一本つけ', '涼拌黃瓜', 350],['だし巻き玉子', '日式蛋卷', 580],['枝豆','毛豆',380],['冷やしトマト','清涼番茄',380]]


let yakimono_list = [['鶏もも串', '鸡腿串', 220], ['ねぎま串', '葱鸡肉串', 220], ['ぼんじり串', '雞屁股', 220], ['砂肝串', '沙肝串', 220], ['つくね串', '鸡肉丸串', 380], ['ねぎ串', '葱串', 180]]


let sasimi_list = [['刺身五点盛り', '五种刺身拼盘', 780], ['刺身三点盛り', '三种刺身拼盘', 680], ['たこぶつ盛り', '章鱼拼盘', 580], ['本まぐろぶつ盛り', '本鲔魚拼盘', 900]]


let ihinn_list = [['鶏そば', '鸡肉麵', 500], ['鶏だし飯', '鸡汤饭', 500]]

let meun_catagory =[['あごだし','海鮮關東煮','agotashi_list',agotashi_list],['鶏だし','雞湯關東煮','toridashi',toridashi_list],['おつまみ','小菜','otsumami',otsumami_list],['焼き鳥','串燒','yakimono',yakimono_list],['揚げ物','炸物','agemono',agemono_list],['刺身','生魚片','sasimi',sasimi_list],['逸品','飯麵','ihinn',ihinn_list]]

let content = document.getElementById('content')

meun('agotashi_list')

nav = '';
for(let i=0 ;i<meun_catagory.length;i++){
  if(i==0){
    nav += `<input type="radio" class="btn-check" name="btnradio" id="${meun_catagory[i][2]}" autocomplete="off" checked>
    <label class="btn btn-outline-primary" for="${meun_catagory[i][2]}">${meun_catagory[i][1]}</label>`
  }else{
    nav += `<input type="radio" class="btn-check" name="btnradio" id="${meun_catagory[i][2]}" autocomplete="off">
    <label class="btn btn-outline-primary" for="${meun_catagory[i][2]}">${meun_catagory[i][1]}</label>`
  }
}
document.getElementById('btnGroup').innerHTML = nav

document.getElementById('btnGroup').addEventListener('change',function(){
  let btn_group = document.querySelectorAll('#btnGroup input')
  for(let i=0; i<btn_group.length;i++){
    if(btn_group[i].checked){
      meun(btn_group[i].id)
      break;
    }
  }
})

function meun(catagory){
  let text = ''
  let list = []
  let title = ''
  console.log(catagory)
  for(let i=0;i<meun_catagory.length;i++){
    if(meun_catagory[i][2]==catagory){
      list = meun_catagory[i][3]
      title = meun_catagory[i][1]
    }
  }

  for(let i = 0 ;i<list.length;i++){
    text += `<tr>
              <td>${list[i][0]}</td>
              <td>${list[i][1]}</td>
              <td>${Math.floor(list[i][2]*1.1)}円</td>
              </tr>`
  }
  document.getElementById('title').textContent = title ;
  content.innerHTML = text;
}

