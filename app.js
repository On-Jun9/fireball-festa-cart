// 파볼페스타 2025 공동구매 장바구니 스크립트

// ---- 유틸 ----
const fmt = n => (n||0).toLocaleString('ko-KR') + '원';
const safeLower = v => (v==null ? '' : String(v)).toLowerCase();
const keyOf = p => `${p?.brand ?? ''}|${p?.name ?? ''}|${p?.size ?? ''}`;

// 푸터 HTML 생성
const createFooter = () => `
  <div style="text-align:center; margin-top:16px; padding-top:12px; border-top:1px solid #e5e7eb; font-size:12px; color:#9ca3af;">
    파이어볼 공식 카페 2025 공동구매 리스트<br>
    fireball-cart.pages.dev<br>
    세차갤 - times9517 (<a href="https://open.kakao.com/o/slem2xXh" target="_blank" style="color:#6b7280; text-decoration:underline;">문의</a>)
  </div>
`;
const PRODUCTS = [
  // 파이어볼 4L
  {brand:"파이어볼 4L", name:"알칼리 프리워시 4L", size:"4L", msrp:60000, discount:"50%", price:30000},
  {brand:"파이어볼 4L", name:"중성 프리워시 4L", size:"4L", msrp:50000, discount:"40%", price:30000},
  {brand:"파이어볼 4L", name:"쇼카 샴푸 4L", size:"4L", msrp:80000, discount:"50%", price:40000},
  {brand:"파이어볼 4L", name:"스노우폼 4L", size:"4L", msrp:60000, discount:"35%", price:39000},
  {brand:"파이어볼 4L", name:"pH3 산성 카샴푸 4L", size:"4L", msrp:70000, discount:"50%", price:35000},
  {brand:"파이어볼 4L", name:"트로피칼 카샴푸 4L", size:"4L", msrp:60000, discount:"40%", price:36000},
  {brand:"파이어볼 4L", name:"리본 4L", size:"4L", msrp:60000, discount:"40%", price:36000},
  {brand:"파이어볼 4L", name:"하이드로 폼 4L", size:"4L", msrp:80000, discount:"35%", price:52000},
  {brand:"파이어볼 4L", name:"하이드로 샴푸 4L", size:"4L", msrp:90000, discount:"50%", price:45000},
  {brand:"파이어볼 4L", name:"아이언번 4L", size:"4L", msrp:80000, discount:"40%", price:48000},
  {brand:"파이어볼 4L", name:"글로스 4L", size:"4L", msrp:100000, discount:"35%", price:65000},
  {brand:"파이어볼 4L", name:"사틴 4L", size:"4L", msrp:100000, discount:"40%", price:60000},
  {brand:"파이어볼 4L", name:"야누스 4L", size:"4L", msrp:110000, discount:"50%", price:55000},
  {brand:"파이어볼 4L", name:"휠앤타이어 4L", size:"4L", msrp:60000, discount:"50%", price:30000},
  {brand:"파이어볼 4L", name:"휠++ 4L", size:"4L", msrp:85000, discount:"35%", price:55250},
  {brand:"파이어볼 4L", name:"[오래데쓰요] 쇼카 타이어 4L (재고 32개)", size:"4L", msrp:120000, discount:"70%", price:36000},
  {brand:"파이어볼 4L", name:"쇼카 타이어 4L", size:"4L", msrp:120000, discount:"40%", price:72000},
  {brand:"파이어볼 4L", name:"글라스 4L", size:"4L", msrp:45000, discount:"35%", price:29250},
  {brand:"파이어볼 4L", name:"나파코트 4L", size:"4L", msrp:60000, discount:"35%", price:39000},
  {brand:"파이어볼 4L", name:"[오래데쓰요] 버그 클리너 4L (재고 108개)", size:"4L", msrp:50000, discount:"70%", price:15000},
  {brand:"파이어볼 4L", name:"워터 스팟 4L", size:"4L", msrp:50000, discount:"35%", price:32500},
  {brand:"파이어볼 4L", name:"필루엣 4L", size:"4L", msrp:120000, discount:"40%", price:72000},
  {brand:"파이어볼 4L", name:"나파클리너 4L", size:"4L", msrp:60000, discount:"40%", price:36000},
  {brand:"파이어볼 4L", name:"그레이스 4L", size:"4L", msrp:88000, discount:"50%", price:44000},
  {brand:"파이어볼 4L", name:"워터리스 맥스 4L", size:"4L", msrp:90000, discount:"50%", price:45000},
  {brand:"파이어볼 4L", name:"워터리스 다이렉트 4L", size:"4L", msrp:50000, discount:"35%", price:32500},
  {brand:"파이어볼 4L", name:"파이어볼 타월 클리너 4L", size:"4L", msrp:50000, discount:"50%", price:25000},
  {brand:"파이어볼 4L", name:"이지코트 엑스트라 4L", size:"4L", msrp:130000, discount:"40%", price:78000},
  {brand:"파이어볼 4L", name:"아이언번 SE 4L", size:"4L", msrp:100000, discount:"40%", price:60000},

  // 파이어볼 500ml
  {brand:"파이어볼 500ml", name:"알칼리 프리워시 500ml", size:"500ml", msrp:14000, discount:"30%", price:9800},
  {brand:"파이어볼 500ml", name:"중성 프리워시 500ml", size:"500ml", msrp:12000, discount:"30%", price:8400},
  {brand:"파이어볼 500ml", name:"쇼카 샴푸 500ml", size:"500ml", msrp:20000, discount:"35%", price:13000},
  {brand:"파이어볼 500ml", name:"스노우폼 500ml", size:"500ml", msrp:15000, discount:"30%", price:10500},
  {brand:"파이어볼 500ml", name:"pH3 산성 카샴푸 500ml", size:"500ml", msrp:18000, discount:"30%", price:12600},
  {brand:"파이어볼 500ml", name:"트로피칼 카샴푸 500ml", size:"500ml", msrp:15000, discount:"30%", price:10500},

  // 파이어볼 400~500ml
  {brand:"파이어볼 400~500ml", name:"하이드로 폼 500ml", size:"500ml", msrp:18000, discount:"30%", price:12600},
  {brand:"파이어볼 400~500ml", name:"하이드로 샴푸 500ml", size:"500ml", msrp:20000, discount:"35%", price:13000},
  {brand:"파이어볼 400~500ml", name:"리본 500ml", size:"500ml", msrp:16000, discount:"30%", price:11200},
  {brand:"파이어볼 400~500ml", name:"아이언번 500ml", size:"500ml", msrp:13000, discount:"30%", price:9100},
  {brand:"파이어볼 400~500ml", name:"휠앤타이어 500ml", size:"500ml", msrp:13000, discount:"30%", price:9100},
  {brand:"파이어볼 400~500ml", name:"쇼카 타이어 500ml", size:"500ml", msrp:28000, discount:"40%", price:16800},
  {brand:"파이어볼 400~500ml", name:"글로스 500ml", size:"500ml", msrp:22000, discount:"35%", price:14300},
  {brand:"파이어볼 400~500ml", name:"사틴 500ml", size:"500ml", msrp:22000, discount:"35%", price:14300},
  {brand:"파이어볼 400~500ml", name:"야누스 500ml", size:"500ml", msrp:24000, discount:"35%", price:15600},
  {brand:"파이어볼 400~500ml", name:"휠+아이언 500ml", size:"500ml", msrp:17000, discount:"30%", price:11900},
  {brand:"파이어볼 400~500ml", name:"글라스 500ml", size:"500ml", msrp:9000, discount:"30%", price:6300},
  {brand:"파이어볼 400~500ml", name:"나파코트 500ml", size:"500ml", msrp:18000, discount:"30%", price:12600},
  {brand:"파이어볼 400~500ml", name:"버그 클리너 500ml", size:"500ml", msrp:12000, discount:"30%", price:8400},
  {brand:"파이어볼 400~500ml", name:"타르 리무버 500ml", size:"500ml", msrp:19000, discount:"30%", price:13300},
  {brand:"파이어볼 400~500ml", name:"워터 스팟 플러스 500ml", size:"500ml", msrp:14000, discount:"30%", price:9800},
  {brand:"파이어볼 400~500ml", name:"필루엣 500ml", size:"500ml", msrp:28000, discount:"40%", price:16800},
  {brand:"파이어볼 400~500ml", name:"나파클리너 500ml", size:"500ml", msrp:15000, discount:"30%", price:10500},
  {brand:"파이어볼 400~500ml", name:"그레이스 500ml", size:"500ml", msrp:22000, discount:"35%", price:14300},
  {brand:"파이어볼 400~500ml", name:"이지코트 엑스트라 500ml", size:"500ml", msrp:30000, discount:"40%", price:18000},
  {brand:"파이어볼 400~500ml", name:"쇼카 듀크 500ml", size:"500ml", msrp:35000, discount:"40%", price:21000},
  {brand:"파이어볼 400~500ml", name:"워터리스 맥스 500ml", size:"500ml", msrp:28000, discount:"40%", price:16800},
  {brand:"파이어볼 400~500ml", name:"워터리스 다이렉트 500ml", size:"500ml", msrp:12000, discount:"30%", price:8400},
  {brand:"파이어볼 400~500ml", name:"파이어볼 타월 클리너 500ml", size:"500ml", msrp:10000, discount:"30%", price:7000},
  {brand:"파이어볼 400~500ml", name:"슈퍼스타 카샴푸 1L", size:"1L", msrp:13800, discount:"30%", price:9660},
  {brand:"파이어볼 400~500ml", name:"아이언번 엑스트라 1L", size:"1L", msrp:22000, discount:"35%", price:14300},
  {brand:"파이어볼 400~500ml", name:"탱크 400ml", size:"400ml", msrp:32000, discount:"40%", price:19200},
  {brand:"파이어볼 400~500ml", name:"타이어 부스터 Ⅰ 250ml", size:"250ml", msrp:40000, discount:"40%", price:24000},
  {brand:"파이어볼 400~500ml", name:"하이드로 글라스 500ml", size:"500ml", msrp:11000, discount:"30%", price:7700},

  // 파이어볼 코팅제
  {brand:"파이어볼 코팅제", name:"파이어볼 글라스 쉴드 50ml", size:"50ml", msrp:18000, discount:"30%", price:12600},
  {brand:"파이어볼 코팅제", name:"신제품 - 파이어볼 엔젤티얼스 II 50ml", size:"50ml", msrp:35000, discount:"40%", price:21000},
  {brand:"파이어볼 코팅제", name:"슈터 브라이트 100ml", size:"100ml", msrp:30000, discount:"30%", price:21000},
  {brand:"파이어볼 코팅제", name:"슈터 다크 100ml", size:"100ml", msrp:30000, discount:"30%", price:21000},
  {brand:"파이어볼 코팅제", name:"신제품 - 휠 코트 <s>50ml</s> 30ml", size:"30ml", msrp:30000, discount:"30%", price:21000},
  {brand:"파이어볼 코팅제", name:"신제품 - 플래시 200ml", size:"200ml", msrp:35000, discount:"30%", price:24500},

  // 워셔액
  {brand:"워셔액", name:"파이어볼 에탄올 워셔액 1.8L 1박스 (12개입)", size:"1.8L×12", msrp:42000, discount:"29%", price:29900},

  // 바인더 4L
  {brand:"바인더 4L", name:"중성 프리워시 4L", size:"4L", msrp:30000, discount:"20%", price:24000},
  {brand:"바인더 4L", name:"[오레데쓰요] 프리미엄 프리워시 4L (재고75)", size:"4L", msrp:54000, discount:"70%", price:16200},
  {brand:"바인더 4L", name:"프리미엄 프리워시 (알칼리) 4L", size:"4L", msrp:54000, discount:"50%", price:27000},
  {brand:"바인더 4L", name:"프리미엄 카샴푸 4L", size:"4L", msrp:43200, discount:"30%", price:30240},
  {brand:"바인더 4L", name:"프리미엄 철분 제거제 4L", size:"4L", msrp:54000, discount:"30%", price:37800},
  {brand:"바인더 4L", name:"프리미엄 휠&타이어 4L", size:"4L", msrp:37800, discount:"20%", price:30240},
  {brand:"바인더 4L", name:"익스트림 휠 세정제 + 4L", size:"4L", msrp:54000, discount:"30%", price:37800},
  {brand:"바인더 4L", name:"버그 클리너 4L", size:"4L", msrp:32400, discount:"20%", price:25920},
  {brand:"바인더 4L", name:"고광택 발수왁스 4L", size:"4L", msrp:54000, discount:"30%", price:37800},
  {brand:"바인더 4L", name:"프리미엄 슬릭왁스 4L", size:"4L", msrp:43200, discount:"30%", price:30240},
  {brand:"바인더 4L", name:"익스트림 타이어 코팅 왁스 4L", size:"4L", msrp:81000, discount:"30%", price:56700},
  {brand:"바인더 4L", name:"유리 세정제 4L", size:"4L", msrp:32400, discount:"20%", price:25920},
  {brand:"바인더 4L", name:"인테리어 클리너 4L", size:"4L", msrp:43200, discount:"30%", price:30240},
  {brand:"바인더 4L", name:"인테리어 원스텝 4L", size:"4L", msrp:43200, discount:"30%", price:30240},
  {brand:"바인더 4L", name:"타월&패드 클리너 4L", size:"4L", msrp:30000, discount:"60%", price:12000},

  // 바인더 500ml~1L
  {brand:"바인더 500ml~1L", name:"프리미엄 카샴푸(블루) 500ml", size:"500ml", msrp:8000, discount:"20%", price:6400},
  {brand:"바인더 500ml~1L", name:"프리미엄 고광택 발수왁스 500ml", size:"500ml", msrp:10000, discount:"20%", price:8000},
  {brand:"바인더 500ml~1L", name:"프리미엄 익스트림 타이어 코팅왁스 500ml", size:"500ml", msrp:15000, discount:"20%", price:12000},
  {brand:"바인더 500ml~1L", name:"에어로졸 타이어 코팅왁스 500ml", size:"500ml", msrp:12000, discount:"20%", price:9600},
  {brand:"바인더 500ml~1L", name:"프리미엄 휠앤타이어 클리너 500ml", size:"500ml", msrp:7000, discount:"20%", price:5600},
  {brand:"바인더 500ml~1L", name:"프리미엄 인테리어 클리너 500ml", size:"500ml", msrp:8000, discount:"20%", price:6400},
  {brand:"바인더 500ml~1L", name:"프리미엄 인테리어 원스텝 500ml", size:"500ml", msrp:10000, discount:"20%", price:8000},
  {brand:"바인더 500ml~1L", name:"프리미엄 유리세정제 500ml", size:"500ml", msrp:6000, discount:"20%", price:4800},
  {brand:"바인더 500ml~1L", name:"프리미엄 버그클리너 500ml", size:"500ml", msrp:6000, discount:"20%", price:4800},
  {brand:"바인더 500ml~1L", name:"프리미엄 철분제거제 500ml", size:"500ml", msrp:10000, discount:"20%", price:8000},
  {brand:"바인더 500ml~1L", name:"프리미엄 익스트림 휠 세정제+500ml", size:"500ml", msrp:10000, discount:"20%", price:8000},
  {brand:"바인더 500ml~1L", name:"프리미엄 슬릭왁스 500ml", size:"500ml", msrp:8000, discount:"20%", price:6400},
  {brand:"바인더 500ml~1L", name:"프리미엄 중성 프리워시 1L", size:"1L", msrp:10000, discount:"20%", price:8000},
  {brand:"바인더 500ml~1L", name:"타월&패드 클리너 1L", size:"1L", msrp:10000, discount:"20%", price:8000},
  {brand:"바인더 500ml~1L", name:"프리미엄 프리워시(알칼리) 500ml", size:"500ml", msrp:10000, discount:"20%", price:8000},

  // 파이어볼 고체왁스 - 블랙 PP용기
  {brand:"파이어볼 고체왁스", name:"블랙 PP용기) 쇼카 그래핀 150ml", size:"150ml", msrp:99000, discount:"30%", price:69000},
  {brand:"파이어볼 고체왁스", name:"블랙 PP용기) 쇼카 밀크크림 150ml", size:"150ml", msrp:99000, discount:"30%", price:69000},
  {brand:"파이어볼 고체왁스", name:"블랙 PP용기) 쇼카 캔디샤베트 150ml", size:"150ml", msrp:99000, discount:"30%", price:69000},
  {brand:"파이어볼 고체왁스", name:"블랙 PP용기) 쇼카 체리블라썸 150ml", size:"150ml", msrp:99000, discount:"30%", price:69000},
  {brand:"파이어볼 고체왁스", name:"블랙 PP용기) 쇼카 버터 150ml", size:"150ml", msrp:99000, discount:"30%", price:69000},
  {brand:"파이어볼 고체왁스", name:"블랙 PP용기) 쇼카 휠 왁스 150ml", size:"150ml", msrp:99000, discount:"30%", price:69000},
  {brand:"파이어볼 고체왁스", name:"블랙 PP용기) 에일리언블러드 150ml", size:"150ml", msrp:99000, discount:"30%", price:69000},
  {brand:"파이어볼 고체왁스", name:"블랙 PP용기) 화이트왁스 150ml", size:"150ml", msrp:99000, discount:"30%", price:69000},
  {brand:"파이어볼 고체왁스", name:"블랙 PP용기) 블랙왁스 150ml", size:"150ml", msrp:99000, discount:"30%", price:69000},
  {brand:"파이어볼 고체왁스", name:"블랙 PP용기) 리버티왁스 150ml", size:"150ml", msrp:99000, discount:"30%", price:69000},
  {brand:"파이어볼 고체왁스", name:"블랙 PP용기) PPF 왁스 150ml", size:"150ml", msrp:110000, discount:"28%", price:79000},
  {brand:"파이어볼 고체왁스", name:"블랙 PP용기) 섹시레이디 150ml", size:"150ml", msrp:110000, discount:"28%", price:79000},
  {brand:"파이어볼 고체왁스", name:"블랙 PP용기) 브라질 150ml", size:"150ml", msrp:120000, discount:"26%", price:89000},
  {brand:"파이어볼 고체왁스", name:"블랙 PP용기) 퓨전 150ml", size:"150ml", msrp:140000, discount:"29%", price:99000},
  {brand:"파이어볼 고체왁스", name:"블랙 PP용기) 고스트 150ml", size:"150ml", msrp:140000, discount:"29%", price:99000},
  {brand:"파이어볼 고체왁스", name:"신제품 - 블랙 PP용기) 퓨전Z 150ml", size:"150ml", msrp:140000, discount:"29%", price:99000},
  {brand:"파이어볼 고체왁스", name:"신제품 - 블랙 PP용기) 몽 150ml", size:"150ml", msrp:140000, discount:"29%", price:99000},

  // 파이어볼 고체왁스 - 원형 아크릴 용기
  {brand:"파이어볼 고체왁스", name:"원형 아크릴 용기) 쇼카 그래핀 170ml", size:"170ml", msrp:170000, discount:"35%", price:110000},
  {brand:"파이어볼 고체왁스", name:"원형 아크릴 용기) 쇼카 에일리언 170ml", size:"170ml", msrp:170000, discount:"35%", price:110000},
  {brand:"파이어볼 고체왁스", name:"원형 아크릴 용기) 쇼카 밀크크림 170ml", size:"170ml", msrp:170000, discount:"35%", price:110000},
  {brand:"파이어볼 고체왁스", name:"원형 아크릴 용기) 쇼카 캔디샤베트 170ml", size:"170ml", msrp:170000, discount:"35%", price:110000},
  {brand:"파이어볼 고체왁스", name:"원형 아크릴 용기) 쇼카 체리블라썸 170ml", size:"170ml", msrp:170000, discount:"35%", price:110000},
  {brand:"파이어볼 고체왁스", name:"원형 아크릴 용기) 쇼카 버터 170ml", size:"170ml", msrp:170000, discount:"35%", price:110000},
  {brand:"파이어볼 고체왁스", name:"원형 아크릴 용기) 쇼카 휠 왁스 170ml", size:"170ml", msrp:170000, discount:"35%", price:110000},
  {brand:"파이어볼 고체왁스", name:"원형 아크릴 용기) 화이트 왁스 170ml", size:"170ml", msrp:170000, discount:"35%", price:110000},
  {brand:"파이어볼 고체왁스", name:"원형 아크릴 용기) 블랙왁스 170ml", size:"170ml", msrp:170000, discount:"35%", price:110000},
  {brand:"파이어볼 고체왁스", name:"원형 아크릴 용기) 리버티왁스 170ml", size:"170ml", msrp:170000, discount:"35%", price:110000},
  {brand:"파이어볼 고체왁스", name:"원형 아크릴 용기) PPF 왁스 170ml", size:"170ml", msrp:190000, discount:"32%", price:130000},
  {brand:"파이어볼 고체왁스", name:"원형 아크릴 용기) 섹시레이디 170ml", size:"170ml", msrp:190000, discount:"32%", price:130000},
  {brand:"파이어볼 고체왁스", name:"원형 아크릴 용기) 브라질 170ml", size:"170ml", msrp:210000, discount:"33%", price:140000},
  {brand:"파이어볼 고체왁스", name:"원형 아크릴 용기) 고스트 170ml", size:"170ml", msrp:230000, discount:"30%", price:160000},

  // 파이어볼 고체왁스 - 사각 아크릴 용기
  {brand:"파이어볼 고체왁스", name:"사각 아크릴 용기) 쇼카 그래핀 200ml", size:"200ml", msrp:200000, discount:"40%", price:120000},
  {brand:"파이어볼 고체왁스", name:"사각 아크릴 용기) 쇼카 에일리언 200ml", size:"200ml", msrp:200000, discount:"40%", price:120000},
  {brand:"파이어볼 고체왁스", name:"사각 아크릴 용기) 쇼카 밀크크림 200ml", size:"200ml", msrp:200000, discount:"40%", price:120000},
  {brand:"파이어볼 고체왁스", name:"사각 아크릴 용기) 쇼카 캔디샤베트 200ml", size:"200ml", msrp:200000, discount:"40%", price:120000},
  {brand:"파이어볼 고체왁스", name:"사각 아크릴 용기) 쇼카 체리블라썸 200ml", size:"200ml", msrp:200000, discount:"40%", price:120000},
  {brand:"파이어볼 고체왁스", name:"사각 아크릴 용기) 쇼카 버터 200ml", size:"200ml", msrp:200000, discount:"40%", price:120000},
  {brand:"파이어볼 고체왁스", name:"사각 아크릴 용기) 쇼카 휠 왁스 200ml", size:"200ml", msrp:200000, discount:"40%", price:120000},
  {brand:"파이어볼 고체왁스", name:"사각 아크릴 용기) 블랙왁스 200ml", size:"200ml", msrp:200000, discount:"40%", price:120000},
  {brand:"파이어볼 고체왁스", name:"사각 아크릴 용기) 화이트 왁스 200ml", size:"200ml", msrp:200000, discount:"40%", price:120000},
  {brand:"파이어볼 고체왁스", name:"사각 아크릴 용기) 리버티왁스 200ml", size:"200ml", msrp:200000, discount:"40%", price:120000},
  {brand:"파이어볼 고체왁스", name:"사각 아크릴 용기) PPF 왁스 200ml", size:"200ml", msrp:220000, discount:"32%", price:150000},
  {brand:"파이어볼 고체왁스", name:"사각 아크릴 용기) 섹시레이디 200ml", size:"200ml", msrp:220000, discount:"32%", price:150000},
  {brand:"파이어볼 고체왁스", name:"사각 아크릴 용기) 브라질 200ml", size:"200ml", msrp:250000, discount:"36%", price:160000},
  {brand:"파이어볼 고체왁스", name:"사각 아크릴 용기) 고스트 200ml", size:"200ml", msrp:280000, discount:"36%", price:180000},

  // 파이어볼 카향수/디퓨저
  {brand:"파이어볼 카향수/디퓨저", name:"파이어볼 카향수 루비 500ml", size:"500ml", msrp:18000, discount:"30%", price:14400},
  {brand:"파이어볼 카향수/디퓨저", name:"파이어볼 카향수 쇼카스카이 500ml", size:"500ml", msrp:18000, discount:"30%", price:14400},
  {brand:"파이어볼 카향수/디퓨저", name:"신제품 - 파이어볼 카향수 리본 500ml", size:"500ml", msrp:18000, discount:"30%", price:14400},
  {brand:"파이어볼 카향수/디퓨저", name:"신제품 - 파이어볼 카향수 엠페라도 500ml", size:"500ml", msrp:18000, discount:"30%", price:14400},
  {brand:"파이어볼 카향수/디퓨저", name:"신제품 - 파이어볼 디퓨저 블랙체리 120ml", size:"120ml", msrp:16000, discount:"30%", price:11200},
  {brand:"파이어볼 카향수/디퓨저", name:"신제품 - 파이어볼 디퓨저 플라워 하우스 120ml", size:"120ml", msrp:16000, discount:"30%", price:11200},
  {brand:"파이어볼 카향수/디퓨저", name:"신제품 - 파이어볼 디퓨저 핑크자몽 120ml", size:"120ml", msrp:16000, discount:"30%", price:11200},

  // 세차용품
  {brand:"세차용품", name:"투명 버킷 18L", size:"18L", msrp:11000, discount:"20%", price:8800},
  {brand:"세차용품", name:"버킷 18L", size:"18L", msrp:10000, discount:"60%", price:4000},
  {brand:"세차용품", name:"휠버킷 7L", size:"7L", msrp:6000, discount:"20%", price:4800},
  {brand:"세차용품", name:"더스트 트랩", size:"", msrp:6000, discount:"20%", price:4800},
  {brand:"세차용품", name:"제트타월 화이트 60x42", size:"60x42", msrp:5000, discount:"50%", price:2500},
  {brand:"세차용품", name:"핀 드라잉 타월 70x90 Ver2", size:"70x90", msrp:9900, discount:"40%", price:5940},
  {brand:"세차용품", name:"양면 드라잉 타월 86x74", size:"86x74", msrp:20000, discount:"50%", price:10000},
  {brand:"세차용품", name:"화이트 어플리케이터", size:"", msrp:2900, discount:"40%", price:1740},
];

// 수동 추가된 항목 모음 — 로컬스토리지에 저장됨
const MANUAL = [];

// 동적 브랜드 목록 채우기 (PRODUCTS+MANUAL 기준)
function populateBrands(){
  const brandSel = document.getElementById('brand');
  if (!brandSel) return;
  const set = new Set();
  for (const p of PRODUCTS) if (p?.brand) set.add(p.brand);
  for (const p of MANUAL) if (p?.brand) set.add(p.brand);
  const brands = Array.from(set).filter(b=>b!=='-').sort((a,b)=>a.localeCompare(b,'ko'));
  if (set.has('-')) brands.push('-');
  const cur = brandSel.value;
  brandSel.innerHTML = '<option value="">전체 브랜드</option>' + brands.map(b=>`<option>${b}</option>`).join('');
  if (brands.includes(cur)) brandSel.value = cur;
  const mBrand = document.getElementById('mBrand');
  if (mBrand){
    mBrand.innerHTML = brands.map(b=>`<option>${b}</option>`).join('');
    if (!brands.includes('-')) mBrand.insertAdjacentHTML('afterbegin','<option>-</option>');
    mBrand.value = '-'; // 기본값 설정
  }
}

// ---- 상태 ----
const cart = new Map(); // key = brand|name|size, value = {product, qty, checked}

// ---- 동작 ----
function addToCart(p, qty){
  if (!p || p.brand==null || p.name==null || p.size==null) { console.warn('잘못된 상품, 추가 취소', p); return; }
  const k = keyOf(p);
  const cur = cart.get(k) || { product: p, qty: 0, checked: true };
  // 제품 정보 업데이트 (가격이 변경되었을 수 있음)
  cur.product = p;
  cur.qty += qty;
  if (cur.qty <= 0) cart.delete(k); else cart.set(k, cur);
  renderCart();
}

function setQty(k, qty){
  const item = cart.get(k);
  if (!item) return;
  if (qty <= 0) cart.delete(k); else item.qty = qty;
  renderCart();
}

function renderProducts(){
  const tbody = document.querySelector('#productTable tbody');
  tbody.innerHTML = '';
  const q = safeLower(document.getElementById('q').value);
  const b = document.getElementById('brand').value;
  const s = document.getElementById('size').value;

  const list = PRODUCTS.concat(MANUAL); // runtime list (PDF + manual)

  const filtered = list.filter(p => {
    const hit = (
      safeLower(p.brand).includes(q) ||
      safeLower(p.name).includes(q) ||
      safeLower(p.size).includes(q)
    );
    const brandOk = !b || (b === '-' ? (p.brand === '-') : (String(p.brand||'').startsWith(b)));
    const sizeOk = !s || p.size === s;
    return hit && brandOk && sizeOk;
  }).sort((a,b)=> a.brand.localeCompare(b.brand) || a.name.localeCompare(b.name) || a.size.localeCompare(b.size));

  for (const p of filtered){
    const tr = document.createElement('tr');
    const isManual = p.manual === true;
    if (isManual) tr.classList.add('manual-item');
    tr.innerHTML = `
      <td data-label="브랜드">${p.brand ?? ''}</td>
      <td data-label="상품명" class="name" title="${p.name ?? ''}">
        ${isManual ? '<button class="btn-delete-inline" title="삭제">×</button>' : ''}${p.name ?? ''}
      </td>
      <td data-label="용량" class="center">${p.size ?? ''}</td>
      <td data-label="소비자가" class="right">${fmt(p.msrp)}</td>
      <td data-label="할인율" class="center"><span class="pill">${p.discount ?? ''}</span></td>
      <td data-label="공구가" class="right">${fmt(p.price)}</td>
      <td data-label="추가" class="center">
        <button class="btn primary">추가</button>
      </td>
    `;
    const addBtn = tr.querySelector('button.primary');
    addBtn.addEventListener('click', ()=>{
      addToCart(p, 1);
      // 시각적 피드백
      addBtn.textContent = '추가됨!';
      addBtn.classList.remove('primary');
      addBtn.classList.add('added', 'pulse');
      setTimeout(() => {
        addBtn.textContent = '추가';
        addBtn.classList.remove('added', 'pulse');
        addBtn.classList.add('primary');
      }, 400);
    });

    // 수동 항목 삭제 버튼
    if (isManual){
      const delBtn = tr.querySelector('button.btn-delete-inline');
      if (delBtn) {
        delBtn.addEventListener('click', ()=>{
          const idx = MANUAL.findIndex(x => x.brand===p.brand && x.name===p.name && x.size===p.size);
          if (idx !== -1){
            MANUAL.splice(idx, 1);
            saveManual();
            populateBrands();
            renderProducts();
          }
        });
      }
    }

    tbody.appendChild(tr);
  }
  // 개수 표기: PDF / 수동 / 총
  const pdfCnt = PRODUCTS.length;
  const manualCnt = MANUAL.length;
  const totalCnt = pdfCnt + manualCnt;
  const pdfSpan = document.getElementById('pdfCount');
  const manualSpan = document.getElementById('manualCount');
  const totalSpan = document.getElementById('totalCount');
  if (pdfSpan) pdfSpan.textContent = pdfCnt;
  if (manualSpan) manualSpan.textContent = manualCnt;
  if (totalSpan) totalSpan.textContent = totalCnt;
}

// 체크박스 동기화 통합 함수
function updateCheckboxes(allChecked, anyChecked){
  const master = document.getElementById('checkAll');
  const masterMobile = document.getElementById('checkAllMobile');
  const isAllChecked = allChecked && cart.size > 0;
  const isIndeterminate = !allChecked && anyChecked;

  [master, masterMobile].forEach(checkbox => {
    if (!checkbox) return;
    checkbox.checked = isAllChecked;
    checkbox.indeterminate = isIndeterminate;
    checkbox.onchange = () => {
      for (const [, it] of cart){ if (it) it.checked = checkbox.checked; }
      renderCart();
    };
  });
}

function renderCart(){
  const tbody = document.querySelector('#cartTable tbody');
  tbody.innerHTML = '';
  let total = 0; let count = 0; let allChecked = true; let anyChecked = false;

  for (const [k, item] of cart){
    const p = item?.product;
    const qty = item?.qty ?? 0;
    if (!p) continue;
    if (item.checked === undefined) item.checked = true;

    const sub = (p.price||0) * qty;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td data-label="선택" class="center"><input type="checkbox" class="rowCheck" ${item.checked ? 'checked' : ''}></td>
      <td data-label="브랜드">${p.brand ?? ''}</td>
      <td data-label="상품명" class="name" title="${p.name}">${p.name}</td>
      <td data-label="용량" class="center">${p.size}</td>
      <td data-label="공구가" class="right">${fmt(p.price)}</td>
      <td data-label="개수" class="center"><input class="qty" type="number" min="0" step="1" value="${qty}" /></td>
      <td data-label="소계" class="right">${fmt(sub)}</td>
      <td data-label="삭제" class="center"><button class="btn del">삭제</button></td>
    `;

    const cb = tr.querySelector('input.rowCheck');
    cb.onchange = ()=>{ item.checked = cb.checked; renderCart(); };

    const qtyInput = tr.querySelector('input.qty');
    qtyInput.addEventListener('change', ()=>{
      const n = parseInt(qtyInput.value||'0',10);
      setQty(k, isNaN(n)?0:n);
    });

    tr.querySelector('button.del').addEventListener('click', ()=> setQty(k, 0));
    tbody.appendChild(tr);

    if (item.checked){ total += sub; count += qty; anyChecked = true; }
    if (!item.checked) allChecked = false;
  }

  document.getElementById('grandTotal').textContent = fmt(total);
  document.getElementById('countInfo').textContent = anyChecked ? `선택 ${count}개 / ${fmt(total)}` : '선택 없음';

  updateCheckboxes(allChecked, anyChecked);
  saveCart();
  renderSummary();
}

function saveCart(){
  const arr = [];
  for (const [, v] of cart){
    if (!v || !v.product) continue;
    const {product, qty, checked} = v;
    arr.push({brand:product.brand, name:product.name, size:product.size, msrp:product.msrp, discount:product.discount, price:product.price, qty, checked: checked!==false});
  }
  try { localStorage.setItem('cart', JSON.stringify(arr)); } catch (e) { console.warn('로컬스토리지 저장 실패', e); }
}

function loadCart(){
  try {
    const raw = localStorage.getItem('cart');
    if (raw){
      const arr = JSON.parse(raw);
      if (!Array.isArray(arr)) throw new Error('저장 포맷 오류');
      cart.clear();
      for (const it of arr){
        // 제품명 공백 정규화 (여러 공백 → 1개)
        if (it.name) it.name = it.name.replace(/\s+/g, ' ').trim();

        // 마이그레이션: 휠 코트 50ml → 30ml 자동 변환
        if (it.brand === '파이어볼 코팅제' && it.name === '신제품 - 휠 코트 50ml' && it.size === '50ml') {
          it.name = '신제품 - 휠 코트 <s>50ml</s> 30ml';
          it.size = '30ml';
        }

        // 마이그레이션: 화이트 어플리케이터 (MANUAL → PRODUCTS)
        if (it.brand === '-' && it.name === '화이트 어플리케이터' && it.size === '-') {
          it.brand = '세차용품';
          it.size = '';
        }

        // 마이그레이션: 바인더 500ml~1L 제품명 업데이트
        if (it.brand === '바인더 500ml~1L') {
          const nameMap = {
            '카샴푸 블루 500ml': '프리미엄 카샴푸(블루) 500ml',
            '고광택 발수왁스 500ml': '프리미엄 고광택 발수왁스 500ml',
            '익스트림 타이어 코팅왁스 500ml': '프리미엄 익스트림 타이어 코팅왁스 500ml',
            '휠앤타이어 클리너 500ml': '프리미엄 휠앤타이어 클리너 500ml',
            '인테리어 클리너 500ml': '프리미엄 인테리어 클리너 500ml',
            '인테리어 원스텝 500ml': '프리미엄 인테리어 원스텝 500ml',
            '유리세정제 500ml': '프리미엄 유리세정제 500ml',
            '버그클리너 500ml': '프리미엄 버그클리너 500ml',
            '철분제거제 500ml': '프리미엄 철분제거제 500ml',
            '익스트림 휠 세정제+500ml': '프리미엄 익스트림 휠 세정제+500ml',
            '슬릭왁스 500ml': '프리미엄 슬릭왁스 500ml',
            '중성 프리워시 1L': '프리미엄 중성 프리워시 1L',
            '프리미엄 프리워시 500ml': '프리미엄 프리워시(알칼리) 500ml'
          };
          if (nameMap[it.name]) it.name = nameMap[it.name];
        }

        // 마이그레이션: 세차용품 제품명/사이즈 업데이트
        if (it.brand === '세차용품') {
          if (it.name === '유색 버킷 18L') {
            it.name = '버킷 18L';
          } else if (it.name === '핀 드라잉 타월 70x90') {
            it.name = '핀 드라잉 타월 70x90 Ver2';
            it.msrp = 9900;
            it.price = 5940;
            it.discount = '40%';
          } else if (it.name === '양면 드라잉 타월 Ver.2 90x70' && it.size === '90x70') {
            it.name = '양면 드라잉 타월 86x74';
            it.size = '86x74';
          } else if (it.name === '트위스트 드라잉 타월 70x90') {
            // 삭제된 제품은 장바구니에서 제거
            continue;
          }
        }

        const p = PRODUCTS.concat(MANUAL).find(x => x && x.brand===it.brand && x.name===it.name && x.size===it.size) || it; // fallback
        if (!p || p.brand==null) continue; // 깨진 항목 스킵
        cart.set(keyOf(p), {product: p, qty: it.qty, checked: it.checked!==false});
      }
    } else {
      // 기본적으로 빈 장바구니(요청 사항)
      cart.clear();
    }
  } catch (e) {
    console.warn('로컬스토리지 로드 실패', e);
    cart.clear();
  }
  renderCart();
}

// 수동 항목 저장
function saveManual(){
  try {
    localStorage.setItem('manualProducts', JSON.stringify(MANUAL));
  } catch (e) {
    console.warn('수동 항목 저장 실패', e);
  }
}

// 수동 항목 로드
function loadManual(){
  try {
    const raw = localStorage.getItem('manualProducts');
    if (raw){
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)){
        MANUAL.length = 0;
        MANUAL.push(...arr);
      }
    }
  } catch (e) {
    console.warn('수동 항목 로드 실패', e);
  }

  // 마이그레이션: 화이트 어플리케이터를 MANUAL에서 제거 (PRODUCTS로 이동됨)
  const whiteApplicatorIdx = MANUAL.findIndex(x =>
    (x.brand === '-' || x.brand === '세차용품') &&
    x.name === '화이트 어플리케이터'
  );
  if (whiteApplicatorIdx !== -1) {
    MANUAL.splice(whiteApplicatorIdx, 1);
    saveManual();
  }
}

// 수동 제품 가격 계산 로직 분리
function calculateManualPrice(msrpValue, discountValue, priceInput){
  let price, discountStr, msrp;

  if (priceInput > 0) {
    // 공구가 직접 입력한 경우
    price = priceInput;
    msrp = msrpValue || priceInput;
    if (msrpValue > 0 && msrpValue !== priceInput) {
      const calculatedDisc = Math.round((1 - priceInput / msrpValue) * 100);
      discountStr = calculatedDisc > 0 ? `${calculatedDisc}%` : '';
    } else {
      discountStr = '';
    }
  } else {
    // 할인율로 자동 계산
    msrp = msrpValue || 0;
    const discNum = Math.min(Math.max(Number(discountValue||0),0),100);
    price = Math.round(msrp * (1 - discNum/100));
    discountStr = discountValue ? `${discountValue}%` : '';
  }

  return {price, discountStr, msrp};
}

// 수동 추가 핸들러
function addManualProduct(){
  const b = document.getElementById('mBrand').value || '-';
  const n = (document.getElementById('mName').value || '').trim();
  const s = (document.getElementById('mSize').value || '-').trim();
  const msrpV = Number(document.getElementById('mMsrp').value || 0);
  const discV = document.getElementById('mDiscount').value;
  const priceInput = Number(document.getElementById('mPrice').value || 0);

  if (!n){ alert('상품명을 입력하세요.'); return; }

  const {price, discountStr, msrp} = calculateManualPrice(msrpV, discV, priceInput);
  const p = {brand:b, name:n, size:s || '-', msrp, discount:discountStr, price:price||0, manual:true};

  const manualIdx = MANUAL.findIndex(x => x.brand===p.brand && x.name===p.name && x.size===p.size);
  const exists = PRODUCTS.concat(MANUAL).some(x => x.brand===p.brand && x.name===p.name && x.size===p.size);

  if (exists){
    if (manualIdx !== -1) {
      MANUAL[manualIdx] = p;
      saveManual();
      renderProducts();
    }
    addToCart(p, 1);
  } else {
    MANUAL.push(p);
    saveManual();
    renderProducts();
  }

  const k = keyOf(p);
  if (cart.has(k)) {
    cart.get(k).product = p;
    renderCart();
  }
}

// 요약 섹션 렌더링
function renderSummary(){
  const summaryContent = document.getElementById('summaryContent');
  if (!summaryContent) return;

  const selectedItems = [];
  let totalMsrp = 0;
  let totalPrice = 0;
  let totalQty = 0;

  // 선택된 항목만 수집
  for (const [, item] of cart){
    if (!item.checked) continue;
    const p = item.product;
    const qty = item.qty;
    selectedItems.push({...p, qty});
    totalMsrp += (p.msrp || 0) * qty;
    totalPrice += (p.price || 0) * qty;
    totalQty += qty;
  }

  const savings = Math.max(0, totalMsrp - totalPrice); // 음수 방지
  const savingsPercent = totalMsrp > 0 ? Math.round((savings / totalMsrp) * 100) : 0;

  // 선택된 상품이 없을 때 이스터 에그
  const isEmpty = selectedItems.length === 0;

  summaryContent.innerHTML = `
  <div class="share-container">
    <div class="share-header">
      <h2>파볼페스타 2025 공동구매</h2>
    </div>
    <div class="share-content">
      <div class="share-items-grid">
        ${isEmpty ?
          '<p style="text-align:center; color:#6b7280; padding:20px;">선택된 상품이 없습니다</p>' :
          selectedItems.map(item => `
          <div class="share-item">
            <div class="share-item-qty">${item.qty}개</div>
            <div class="share-item-info">
              <div class="share-item-name">${item.name} <span style="font-size:0.7em; color:#9ca3af; font-weight:normal;">(${item.brand})</span></div>
              <div class="share-item-meta">${item.size}</div>
              <div class="share-item-prices">
                <span class="share-price-original">${fmt(item.msrp * item.qty)}</span>
                <span class="share-price-discount">${fmt(item.price * item.qty)}</span>
                ${item.discount ? `<span class="share-item-badge">${item.discount}</span>` : ''}
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="share-summary">
        <div class="share-summary-row">
          <span class="share-summary-label">정상가 합계</span>
          <span class="share-summary-value">${fmt(totalMsrp)}</span>
        </div>
        <div class="share-summary-row">
          <span class="share-summary-label">${isEmpty ? '안 사면' : '할인 금액'} <span class="share-summary-badge">${isEmpty ? '100% 할인' : savingsPercent + '% 절약'}</span></span>
          <span class="share-summary-value savings">-${fmt(savings)}</span>
        </div>
        <div class="share-summary-row total">
          <span class="share-summary-label">최종 결제 금액 (${totalQty}개)</span>
          <span class="share-summary-value final">${fmt(totalPrice)}</span>
        </div>
      </div>
    </div>
    <div class="share-footer">
      파이어볼 공식 카페 2025 공동구매 리스트<br>
      fireball-cart.pages.dev<br>
      세차갤 - times9517 (<a href="https://open.kakao.com/o/slem2xXh" target="_blank" style="color:#6b7280; text-decoration:underline;">문의</a>)
    </div>
  </div>
  `;
}

// 이벤트 바인딩
document.getElementById('q').addEventListener('input', renderProducts);
document.getElementById('brand').addEventListener('change', renderProducts);
document.getElementById('size').addEventListener('change', renderProducts);
document.getElementById('clearCart').addEventListener('click', ()=>{ cart.clear(); renderCart(); });
document.getElementById('mAdd').addEventListener('click', addManualProduct);
// 수동추가 토글 버튼
const toggleBtn = document.getElementById('toggleManual');
const manualPanel = document.getElementById('manualPanel');
if (toggleBtn && manualPanel){
  toggleBtn.addEventListener('click', ()=>{
    const cur = manualPanel.style.display;
    manualPanel.style.display = (cur === 'none' || cur === '') ? 'block' : 'none';
  });
}

// 할인율 입력 시 공구가 자동 계산
function recomputeManualPrice(){
  const msrp = Number(document.getElementById('mMsrp').value || 0);
  const disc = Math.min(Math.max(Number(document.getElementById('mDiscount').value || 0),0),100);
  const priceInput = document.getElementById('mPrice');
  if (!priceInput || isNaN(msrp)) return;
  if (document.activeElement !== priceInput){
    const calc = Math.round(msrp * (1 - disc/100));
    priceInput.value = calc>0?calc:'';
  }
}
document.getElementById('mMsrp').addEventListener('input', recomputeManualPrice);
document.getElementById('mDiscount').addEventListener('input', recomputeManualPrice);

// 탭 전환 시스템
const tabs = [
  {name: 'select', btn: 'tabSelect', section: 'selectSection'},
  {name: 'cart', btn: 'tabCart', section: 'cartSection'},
  {name: 'summary', btn: 'tabSummary', section: 'summarySection'}
];

function applyTab(activeName){
  tabs.forEach(tab => {
    const btn = document.getElementById(tab.btn);
    const section = document.getElementById(tab.section);
    const isActive = tab.name === activeName;

    btn?.classList.toggle('active', isActive);
    section?.classList.toggle('mobile-hide', !isActive);
  });

  if (activeName === 'summary') renderSummary();
}

tabs.forEach(tab => {
  document.getElementById(tab.btn)?.addEventListener('click', () => applyTab(tab.name));
});

function syncTabsToViewport(){
  const activeTab = tabs.find(tab => document.getElementById(tab.btn)?.classList.contains('active'));
  if (activeTab) applyTab(activeTab.name);
}
window.addEventListener('resize', syncTabsToViewport);

// 초기 렌더
loadManual();
populateBrands();
renderProducts();
loadCart();
applyTab('select'); // 초기 탭 설정

// 푸터 삽입
document.getElementById('selectFooter').innerHTML = createFooter();
document.getElementById('cartFooter').innerHTML = createFooter();

