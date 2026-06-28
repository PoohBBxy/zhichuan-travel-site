/**
 * Local, offline i18n engine.
 *
 * Translations are keyed by the original (trimmed) Simplified Chinese string, so
 * no markup changes are required on the pages — the engine walks text nodes and
 * `placeholder` attributes and swaps them in place. Switching back to Chinese
 * restores the captured originals, so it is fully reversible and deterministic.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "zhichuan-language";
  var HTML_LANG = {
    chinese_simplified: "zh-CN",
    english: "en",
    japanese: "ja",
    korean: "ko",
  };

  // dict[language][originalChinese] = translatedString
  var dict = {
    english: {
      // Navigation / shared chrome
      "网站首页": "Home",
      "服务范围": "Services",
      "企业资质": "Credentials",
      "客户反馈": "Testimonials",
      "新闻资讯": "News",
      "关于我们": "About Us",
      "联系我们": "Contact",
      "首页": "Home",
      "尾页": "Last",
      "搜索...": "Search...",
      "了解更多": "Learn More",
      "查看更多": "View More",
      "提交": "Submit",
      "公司新闻": "Company News",
      "行业新闻": "Industry News",
      "公司简介": "Company Profile",
      "在线留言": "Online Message",
      "Copyright © 2026 织川文化传媒(济南)有限公司": "Copyright © 2026 Zhichuan Culture Media (Jinan) Co., Ltd.",
      "织川文化传媒(济南)有限公司": "Zhichuan Culture Media (Jinan) Co., Ltd.",
      "关注我们": "Follow Us",

      // Breadcrumb tails
      "/ 服务范围": "/ Services",
      "/ 关于我们": "/ About Us",
      "/ 联系我们": "/ Contact",
      "/ 企业资质": "/ Credentials",
      "/ 新闻资讯": "/ News",
      "/ 客户反馈": "/ Testimonials",
      ">> 甄选酒店": ">> Curated Hotels",
      ">> 特惠机票": ">> Discount Flights",
      ">> 旅行咨询": ">> Travel Consulting",
      ">> 定制行程": ">> Custom Itineraries",
      ">> 搜索结果": ">> Search Results",

      // Home hero + about
      "甄选酒店、安心旅行、便捷机票，让每一次出发都更从容":
        "Handpicked hotels, worry-free travel, and easy flights — making every departure more relaxed.",
      "我们围绕酒店、旅行和机票三类核心需求，为商务差旅、家庭度假、团队出行和自由行客户提供清晰、稳定、贴心的出行服务。":
        "We focus on three core needs — hotels, travel, and flights — providing clear, reliable, and thoughtful service for business trips, family vacations, group travel, and independent travelers.",
      "从酒店筛选、票务方案、路线建议到出行提醒，我们把复杂信息整理成可执行的方案，让客户少花时间比价和协调，把精力留给真正的旅程体验。":
        "From hotel selection and ticketing to route advice and travel reminders, we turn complex information into actionable plans — so clients spend less time comparing and coordinating, and more on the journey itself.",

      // Service names
      "甄选酒店": "Curated Hotels",
      "旅行咨询": "Travel Consulting",
      "特惠机票": "Discount Flights",
      "定制行程": "Custom Itineraries",

      // Service descriptions (home)
      "根据位置、预算、房型、配套和真实体验筛选酒店，兼顾商务效率、度假舒适度和家庭出行便利性。":
        "We select hotels by location, budget, room type, amenities, and real guest experience — balancing business efficiency, vacation comfort, and family convenience.",
      "围绕目的地、天数、预算和同行人情况提供路线建议、节奏安排、用车导览和当地体验咨询。":
        "We offer route suggestions, pacing, transport, and local experience advice based on destination, duration, budget, and travel companions.",
      "结合航线、舱位、日期和中转策略匹配机票方案，帮助客户在价格、时间和舒适度之间做出合适选择。":
        "We match flight options across routes, cabins, dates, and connections, helping clients balance price, time, and comfort.",
      "为亲子、情侣、商务、小团体等场景设计专属行程，覆盖住宿、交通、游玩安排和出行提醒。":
        "We design tailored itineraries for families, couples, business, and small groups — covering lodging, transport, activities, and reminders.",

      // Honors (home)
      "合规经营": "Compliant Operation",
      "酒店、票务与行程咨询流程清晰，需求确认、方案沟通和服务响应透明可追踪。":
        "Clear processes for hotels, ticketing, and itinerary consulting, with transparent, trackable needs confirmation, communication, and response.",
      "资源合作": "Resource Partnerships",
      "持续对接酒店、航司、目的地服务商与本地出行资源，提升方案匹配效率。":
        "We continually connect with hotels, airlines, destination providers, and local travel resources to improve matching efficiency.",
      "出行保障": "Travel Assurance",
      "行前确认、途中提醒、临时调整和行后反馈覆盖完整旅程。":
        "Pre-trip confirmation, en-route reminders, last-minute changes, and post-trip feedback cover the whole journey.",

      // Why choose us
      "为什么选择我们": "Why Choose Us",
      "专业定制服务": "Tailored Service",
      "根据出行目的、预算、时间和同行人需求制定方案，减少无效比价和反复沟通。":
        "Plans built around your purpose, budget, timing, and companions — cutting wasted comparison and back-and-forth.",
      "多元资源网络": "Diverse Network",
      "对接酒店、航司、当地用车、导览和目的地体验资源，提升出行匹配效率。":
        "Connections to hotels, airlines, local transport, guides, and destination experiences improve matching efficiency.",
      "全流程出行保障": "End-to-End Assurance",
      "从行前咨询到临时调整，关键节点都有专人跟进。":
        "From pre-trip consulting to last-minute changes, a dedicated contact follows every key step.",
      "高标准服务质量": "High Service Standards",
      "持续优化咨询、报价、确认和反馈流程，让出行服务更稳定。":
        "We keep refining consulting, quoting, confirmation, and feedback to make service more consistent.",
      "丰富行业经验": "Industry Experience",
      "熟悉商务差旅、家庭度假、自由行、团队出游和票务方案的差异化需求。":
        "Familiar with the distinct needs of business travel, family vacations, independent trips, group tours, and ticketing.",
      "客户至上理念": "Client-First",
      "倾听真实出行需求，提供更贴合场景的建议，帮助客户做出清晰选择。":
        "We listen to real needs and give context-fit advice to help clients make clear choices.",

      // Feedback (home, short)
      "酒店位置和房型推荐很准确，商务出差节省了不少筛选时间。":
        "The hotel location and room recommendations were spot-on, saving me lots of time on business trips.",
      "旅行路线安排得不赶，老人和孩子的需求都提前考虑到了。":
        "The itinerary wasn't rushed, and the needs of our elderly and kids were considered in advance.",
      "机票方案给得很清楚，价格、时间和中转选择都能对比。":
        "The flight options were clearly laid out, comparing price, time, and connections.",
      "临时调整行程时响应很快，替代酒店和交通都衔接得上。":
        "They responded quickly to last-minute changes, with backup hotels and transport ready.",
      "预算范围讲得很实在，酒店和机票都没有强推不必要的项目。":
        "Budget guidance was honest — no pushing unnecessary upgrades on hotels or flights.",

      // News (home + page)
      "商务差旅酒店怎么选更稳妥": "How to choose business-trip hotels more wisely",
      "位置、早餐、交通、退改政策和发票支持都会影响真实出差效率。":
        "Location, breakfast, transport, cancellation policy, and invoicing all affect real business-trip efficiency.",
      "家庭旅行订机票要提前看哪些细节": "What to check early when booking family flights",
      "儿童票、行李额度、起降时间和转机距离都会影响全家人的出行体验。":
        "Child fares, baggage allowance, flight times, and transfer distances all affect the whole family's experience.",
      "自由行路线规划不要只堆景点": "Don't just pile on sights when planning independent trips",
      "每日活动密度、城市切换、酒店位置和休息时间要一起考虑。":
        "Daily pace, city transfers, hotel location, and rest time should be considered together.",
      "短途周末游如何提高体验感": "How to make short weekend trips more enjoyable",
      "减少路上消耗，优先保证住宿舒适度和核心体验，是短途旅行的关键。":
        "Cutting travel time and prioritizing comfortable lodging and core experiences is key for short trips.",
      "酒店预订时别忽略退改规则": "Don't overlook cancellation rules when booking hotels",
      "旺季、展会和节假日价格波动明显，提前确认退改规则可以降低风险。":
        "Prices swing during peak seasons, expos, and holidays; confirming cancellation rules early reduces risk.",
      "多人同行如何控制预算": "How to manage budgets for group travel",
      "住宿分房、交通方式和每日餐饮标准提前统一，能减少行程中的临时分歧。":
        "Agreeing on room sharing, transport, and daily dining budgets in advance reduces friction during the trip.",
      "关注酒店预订、机票选择、旅行规划和商务差旅中的实用信息。":
        "Practical insights on hotel booking, flight choices, travel planning, and business trips.",

      // Follow us / contact info
      "织川文化传媒(济南)有限公司为客户提供酒店预订、旅行咨询、机票方案和定制行程服务。无论是商务差旅、家庭度假还是团队出行，我们都可以根据您的需求提供细致支持。":
        "Zhichuan Culture Media (Jinan) Co., Ltd. provides hotel booking, travel consulting, flight options, and custom itineraries. Whether business travel, family vacations, or group trips, we offer attentive support tailored to your needs.",
      "咨询电话": "Hotline",
      "公司地址": "Address",
      "服务时间": "Hours",
      "周一至周日 09:00-21:00，可根据出行紧急情况沟通。":
        "Mon–Sun 09:00–21:00; flexible for urgent travel needs.",
      "山东省济南市高新区舜义路城投环贸中心J座1406":
        "Room 1406, Tower J, Chengtou Huanmao Center, Shunyi Road, High-tech Zone, Jinan, Shandong",
      "济南高新区": "Jinan High-tech Zone",
      "城投环贸中心J座1406": "Tower J, Chengtou Huanmao Center, Rm 1406",

      // Forms
      "姓名：": "Name:",
      "电话：": "Phone:",
      "邮箱：": "Email:",
      "内容：": "Message:",
      "验证码：": "Code:",
      "请输入您的称呼": "Enter your name",
      "请输入您的联系电话": "Enter your phone number",
      "请输入您的邮箱": "Enter your email",
      "请输入您的留言内容": "Enter your message",
      "请简单描述酒店、旅行或机票需求": "Briefly describe your hotel, travel, or flight needs",
      "请输入右边的验证码": "Enter the code on the right",
      "请输入您的姓名。": "Please enter your name.",
      "请输入正确的联系电话。": "Please enter a valid phone number.",
      "验证码不正确，请重新输入。": "Incorrect code, please try again.",
      "留言已记录在前端演示中，正式上线时可接入后台。":
        "Your message was recorded in this front-end demo; a backend can be connected at launch.",

      // Page hero subtitles
      "甄选酒店、旅行咨询、特惠机票与定制行程，覆盖商务差旅、家庭度假与团队出行。":
        "Curated hotels, travel consulting, discount flights, and custom itineraries — covering business trips, family vacations, and group travel.",
      "以酒店、旅行、机票服务为核心，为客户整理更清晰、更省心的出行方案。":
        "Centered on hotel, travel, and flight services, we organize clearer, more worry-free travel plans for clients.",
      "需要酒店、旅行、机票咨询时，可以通过电话或留言与我们联系。":
        "For hotel, travel, or flight inquiries, reach us by phone or message.",
      "以规范沟通、资源匹配和出行保障为服务基础，为客户提供可信赖的酒店、旅行和机票咨询。":
        "Built on clear communication, resource matching, and travel assurance, we offer trustworthy hotel, travel, and flight consulting.",
      "来自酒店预订、机票咨询、商务差旅和家庭旅行客户的真实体验反馈。":
        "Real feedback from hotel booking, flight inquiry, business travel, and family trip clients.",

      // About page
      "公司位于山东省济南市高新区舜义路城投环贸中心J座1406，主营酒店、旅行、机票相关服务，面向商务差旅、家庭度假、团队出行和自由行客户提供咨询与方案支持。":
        "Located at Room 1406, Tower J, Chengtou Huanmao Center, Shunyi Road, High-tech Zone, Jinan, Shandong, the company focuses on hotel, travel, and flight services, offering consulting and planning support for business, family, group, and independent travelers.",
      "我们重视信息准确度和服务响应速度，从客户需求出发，帮助客户梳理酒店选择、航班安排、行程节奏和预算控制，尽量把复杂的出行信息变得清楚可执行。":
        "We value accurate information and fast response, starting from client needs to clarify hotel choices, flight arrangements, pacing, and budget — turning complex travel details into clear, actionable plans.",
      "无论是临时商务出行，还是提前规划的假期旅程，我们都希望用稳定、细致的服务，让客户少花时间协调，多一些从容出发的确定感。":
        "Whether a last-minute business trip or a long-planned holiday, we aim to provide steady, detailed service — so clients spend less time coordinating and feel more assured at departure.",
      "服务理念": "Our Approach",
      "真实需求优先": "Real Needs First",
      "先理解客户出行目的，再推荐酒店、航班和路线。":
        "We understand your travel purpose first, then recommend hotels, flights, and routes.",
      "信息清楚透明": "Clear & Transparent",
      "把价格、时间、规则和风险点讲清楚，方便客户判断。":
        "We spell out prices, timing, rules, and risks so clients can decide easily.",
      "执行稳定可靠": "Reliable Execution",
      "行前确认关键节点，途中保持响应，降低临时变动影响。":
        "We confirm key points before the trip and stay responsive en route to minimize disruptions.",
      "长期服务意识": "Long-Term Service",
      "积累客户偏好，为后续差旅和旅行提供更高效的支持。":
        "We learn your preferences to support future trips more efficiently.",

      // Service list page (different hotel desc)
      "根据城市位置、房型、价格、早餐、交通和退改政策筛选酒店，适配商务差旅、家庭度假和团队入住需求。":
        "We select hotels by city location, room type, price, breakfast, transport, and cancellation policy — fitting business, family, and group stays.",

      // Qualifications page items
      "公司信息、服务范围和沟通流程清晰透明，围绕客户真实出行需求提供咨询与方案支持。":
        "Company information, service scope, and communication are clear and transparent, with consulting and planning centered on real travel needs.",
      "酒店资源": "Hotel Resources",
      "关注酒店位置、房型、配套、退改规则和综合体验，帮助客户筛选更适合的住宿选择。":
        "We watch location, room type, amenities, cancellation rules, and overall experience to help select better stays.",
      "票务方案": "Ticketing Plans",
      "结合航线、时间、预算、行李额度和中转安排提供机票方案参考，降低客户比价压力。":
        "We offer flight references combining routes, timing, budget, baggage, and connections to ease price comparison.",
      "服务保障": "Service Assurance",
      "覆盖需求确认、行前提醒、途中沟通和行后反馈，帮助客户应对行程变化。":
        "Covering needs confirmation, pre-trip reminders, en-route communication, and post-trip feedback to handle changes.",

      // Feedback page (long quotes + roles)
      "商务差旅客户": "Business Traveler",
      "家庭旅行客户": "Family Traveler",
      "机票咨询客户": "Flight Inquiry Client",
      "团队出行客户": "Group Travel Client",
      "自由行客户": "Independent Traveler",
      "临时出行客户": "Last-Minute Traveler",
      "酒店位置和房型推荐很准确，离会议地点近，发票和退改也提前确认好了。":
        "The hotel location and room picks were accurate, close to the venue, with invoices and cancellation confirmed in advance.",
      "一家人出游最怕节奏太赶，这次酒店和行程安排都比较舒服，孩子也玩得开心。":
        "Family trips can feel rushed, but the hotels and schedule were comfortable this time, and the kids had fun.",
      "机票方案对比很清楚，帮我避开了时间不合适的中转，整体价格也合理。":
        "The flight comparison was clear, helped me avoid awkward connections, and the price was reasonable.",
      "多人出行沟通复杂，他们把酒店、交通和集合时间整理得很清楚，执行很顺。":
        "Group travel is hard to coordinate, but they organized hotels, transport, and meeting times clearly, and it ran smoothly.",
      "路线建议很实在，没有堆太多景点，每天留了休息时间，旅行体验轻松很多。":
        "The route advice was practical — not overloaded with sights, with rest time each day, making the trip much more relaxed.",
      "临时订票和改酒店都处理得比较快，重要信息会及时提醒，心里踏实。":
        "Last-minute bookings and hotel changes were handled quickly, with timely reminders that put me at ease.",

      // Search page
      "搜索结果": "Search Results",
      "根据位置、房型、价格、早餐、交通和退改政策筛选酒店。":
        "We select hotels by location, room type, price, breakfast, transport, and cancellation policy.",
      "提供航班时间、价格、行李额度、中转方案和退改规则对比。":
        "We compare flight times, prices, baggage, connections, and cancellation rules.",
      "围绕目的地、天数、预算和同行人情况提供路线建议。":
        "We provide route suggestions based on destination, days, budget, and companions.",
      "为亲子、情侣、商务、小团体等场景设计专属行程。":
        "We design tailored itineraries for families, couples, business, and small groups.",
      "电话：15866703327，地址：山东省济南市高新区舜义路城投环贸中心J座1406。":
        "Tel: 15866703327. Address: Room 1406, Tower J, Chengtou Huanmao Center, Shunyi Road, High-tech Zone, Jinan, Shandong.",
      "没有找到匹配内容，请更换关键词或直接联系我们。":
        "No matching results. Try different keywords or contact us directly.",

      // Service detail pages
      "栏目：服务范围　联系电话：15866703327": "Category: Services　Tel: 15866703327",
      "一个稳定的旅程，离不开合适的住宿安排。我们会结合客户的出行目的、预算范围、交通位置、房型需求和入住偏好，筛选更适合的酒店选择。":
        "A smooth trip depends on the right lodging. We select suitable hotels based on your purpose, budget, location, room needs, and stay preferences.",
      "商务差旅更重视交通效率、早餐时间、发票支持和退改规则；家庭度假更关注房型面积、亲子配套、周边餐饮和入住舒适度。不同场景需要不同的判断标准。":
        "Business trips prioritize transport, breakfast timing, invoicing, and cancellation; family vacations focus on room size, family amenities, nearby dining, and comfort. Different scenarios call for different criteria.",
      "商务酒店、度假酒店、亲子酒店、团队酒店咨询": "Consulting on business, resort, family, and group hotels",
      "酒店位置、价格、房型、早餐、退改政策对比": "Comparing hotel location, price, room type, breakfast, and cancellation policy",
      "入住前关键信息提醒和临时调整协助": "Pre-stay reminders and help with last-minute changes",
      "机票选择不只是比较价格，还要综合航班时间、行李额度、中转距离、退改规则和同行人状态。我们会帮助客户把可选方案整理清楚，减少反复切换平台比价的成本。":
        "Choosing flights isn't just about price — it weighs flight times, baggage, transfer distance, cancellation rules, and companions. We organize the options clearly to save you platform-hopping.",
      "针对商务差旅、家庭出行、学生返程、临时出行等场景，我们会优先筛选更稳妥的时间组合，兼顾价格与出行效率。":
        "For business trips, family travel, student returns, and last-minute trips, we prioritize reliable time combinations balancing price and efficiency.",
      "国内与国际航线机票方案咨询": "Consulting on domestic and international flight options",
      "直飞、中转、早晚班机和行李规则对比": "Comparing direct, connecting, early/late flights, and baggage rules",
      "多人同行、儿童老人出行、临时调整协助": "Help with group travel, kids and seniors, and last-minute changes",
      "好的旅行规划，需要在“想去哪里”和“怎么去更舒服”之间找到平衡。我们会根据客户天数、预算、同行人结构和兴趣偏好，提供目的地选择、路线节奏和住宿交通建议。":
        "Good trip planning balances “where to go” and “how to go comfortably.” Based on your days, budget, companions, and interests, we advise on destinations, pacing, lodging, and transport.",
      "对于第一次去的目的地，我们会重点提示城市切换、景点距离、当地交通、季节天气和每日活动密度，避免把旅行做成赶路清单。":
        "For first-time destinations, we highlight city transfers, sight distances, local transport, seasonal weather, and daily pace, so the trip isn't just a checklist of rushing around.",
      "自由行、家庭游、商务游、团队游路线建议": "Route advice for independent, family, business, and group trips",
      "目的地选择、交通衔接、酒店区域分析": "Destination choices, transport connections, and hotel-area analysis",
      "行前提醒、当地体验和临时调整建议": "Pre-trip reminders, local experiences, and last-minute advice",
      "定制行程适合对时间、住宿、交通和体验有明确要求的客户。我们会把酒店、机票、交通衔接和每日安排整合成清楚的出行方案，减少客户自己协调多个环节的压力。":
        "Custom itineraries suit clients with clear needs for timing, lodging, transport, and experiences. We integrate hotels, flights, connections, and daily plans into a clear scheme, easing the burden of coordinating many parts.",
      "无论是亲子度假、情侣旅行、商务接待还是小团队出游，我们都会根据实际场景控制节奏，避免行程过满，同时保留必要的机动空间。":
        "Whether a family vacation, couples' trip, business hosting, or small-group outing, we pace the plan to the real scenario, avoiding overpacked schedules while keeping room to adapt.",
      "亲子、情侣、商务、小团体定制行程": "Custom itineraries for families, couples, business, and small groups",
      "住宿、机票、交通、体验项目统筹建议": "Coordinated advice on lodging, flights, transport, and activities",
      "行前清单、关键节点提醒和途中沟通支持": "Pre-trip checklists, key-point reminders, and en-route support",
    },

    japanese: {
      "网站首页": "ホーム",
      "服务范围": "サービス",
      "企业资质": "企業資質",
      "客户反馈": "お客様の声",
      "新闻资讯": "ニュース",
      "关于我们": "会社概要",
      "联系我们": "お問い合わせ",
      "首页": "ホーム",
      "尾页": "最後",
      "搜索...": "検索...",
      "了解更多": "詳しく見る",
      "查看更多": "もっと見る",
      "提交": "送信",
      "公司新闻": "会社ニュース",
      "行业新闻": "業界ニュース",
      "公司简介": "会社紹介",
      "在线留言": "オンライン問い合わせ",
      "Copyright © 2026 织川文化传媒(济南)有限公司": "Copyright © 2026 織川文化伝媒（済南）有限公司",
      "织川文化传媒(济南)有限公司": "織川文化伝媒（済南）有限公司",
      "关注我们": "フォローする",

      "/ 服务范围": "/ サービス",
      "/ 关于我们": "/ 会社概要",
      "/ 联系我们": "/ お問い合わせ",
      "/ 企业资质": "/ 企業資質",
      "/ 新闻资讯": "/ ニュース",
      "/ 客户反馈": "/ お客様の声",
      ">> 甄选酒店": ">> 厳選ホテル",
      ">> 特惠机票": ">> お得な航空券",
      ">> 旅行咨询": ">> 旅行コンサルティング",
      ">> 定制行程": ">> オーダーメイド旅程",
      ">> 搜索结果": ">> 検索結果",

      "甄选酒店、安心旅行、便捷机票，让每一次出发都更从容":
        "厳選ホテル、安心の旅、便利な航空券で、すべての出発をより快適に。",
      "我们围绕酒店、旅行和机票三类核心需求，为商务差旅、家庭度假、团队出行和自由行客户提供清晰、稳定、贴心的出行服务。":
        "ホテル・旅行・航空券という3つのコアニーズを軸に、出張、家族旅行、団体旅行、個人旅行のお客様へ、明確で安定した、心配りのあるサービスを提供します。",
      "从酒店筛选、票务方案、路线建议到出行提醒，我们把复杂信息整理成可执行的方案，让客户少花时间比价和协调，把精力留给真正的旅程体验。":
        "ホテル選び、チケット手配、ルート提案から出発前のリマインドまで、複雑な情報を実行可能なプランに整理し、お客様が比較や調整に費やす時間を減らし、旅そのものに集中できるようにします。",

      "甄选酒店": "厳選ホテル",
      "旅行咨询": "旅行コンサルティング",
      "特惠机票": "お得な航空券",
      "定制行程": "オーダーメイド旅程",

      "根据位置、预算、房型、配套和真实体验筛选酒店，兼顾商务效率、度假舒适度和家庭出行便利性。":
        "立地、予算、部屋タイプ、設備、実際の宿泊体験からホテルを厳選し、ビジネスの効率、休暇の快適さ、家族旅行の利便性を両立します。",
      "围绕目的地、天数、预算和同行人情况提供路线建议、节奏安排、用车导览和当地体验咨询。":
        "目的地、日数、予算、同行者に合わせて、ルート提案、ペース配分、車両手配、現地体験のアドバイスを行います。",
      "结合航线、舱位、日期和中转策略匹配机票方案，帮助客户在价格、时间和舒适度之间做出合适选择。":
        "路線、クラス、日付、乗り継ぎを踏まえて航空券プランを提案し、価格・時間・快適さのバランスをサポートします。",
      "为亲子、情侣、商务、小团体等场景设计专属行程，覆盖住宿、交通、游玩安排和出行提醒。":
        "親子、カップル、ビジネス、小グループなどに合わせた専用旅程を設計し、宿泊・交通・観光・出発前の案内までカバーします。",

      "合规经营": "適正な運営",
      "酒店、票务与行程咨询流程清晰，需求确认、方案沟通和服务响应透明可追踪。":
        "ホテル・チケット・旅程相談のプロセスが明確で、要望確認、提案、対応の透明性と追跡性を確保します。",
      "资源合作": "リソース連携",
      "持续对接酒店、航司、目的地服务商与本地出行资源，提升方案匹配效率。":
        "ホテル、航空会社、現地サービス事業者、地域の交通リソースと継続的に連携し、提案精度を高めます。",
      "出行保障": "旅のサポート",
      "行前确认、途中提醒、临时调整和行后反馈覆盖完整旅程。":
        "出発前の確認、移動中のリマインド、急な変更、帰着後のフィードバックまで、旅全体をサポートします。",

      "为什么选择我们": "選ばれる理由",
      "专业定制服务": "専門的なカスタマイズ",
      "根据出行目的、预算、时间和同行人需求制定方案，减少无效比价和反复沟通。":
        "目的・予算・時間・同行者に合わせてプランを作成し、無駄な比較とやり取りを減らします。",
      "多元资源网络": "多様なネットワーク",
      "对接酒店、航司、当地用车、导览和目的地体验资源，提升出行匹配效率。":
        "ホテル、航空会社、現地の車両、ガイド、目的地体験のリソースと連携し、マッチング効率を高めます。",
      "全流程出行保障": "全行程サポート",
      "从行前咨询到临时调整，关键节点都有专人跟进。":
        "出発前の相談から急な変更まで、重要な場面を専任担当がフォローします。",
      "高标准服务质量": "高水準のサービス",
      "持续优化咨询、报价、确认和反馈流程，让出行服务更稳定。":
        "相談、見積り、確認、フィードバックの流れを継続的に改善し、より安定したサービスを目指します。",
      "丰富行业经验": "豊富な業界経験",
      "熟悉商务差旅、家庭度假、自由行、团队出游和票务方案的差异化需求。":
        "出張、家族旅行、個人旅行、団体旅行、チケット手配それぞれの異なるニーズに精通しています。",
      "客户至上理念": "お客様第一",
      "倾听真实出行需求，提供更贴合场景的建议，帮助客户做出清晰选择。":
        "本当のご要望に耳を傾け、状況に合った提案で、お客様が明確に選べるようサポートします。",

      "酒店位置和房型推荐很准确，商务出差节省了不少筛选时间。":
        "ホテルの立地と部屋の提案が的確で、出張の選定時間をかなり節約できました。",
      "旅行路线安排得不赶，老人和孩子的需求都提前考虑到了。":
        "旅程に余裕があり、高齢者や子どもの事情も事前に配慮されていました。",
      "机票方案给得很清楚，价格、时间和中转选择都能对比。":
        "航空券のプランが分かりやすく、価格・時間・乗り継ぎを比較できました。",
      "临时调整行程时响应很快，替代酒店和交通都衔接得上。":
        "急な変更にも素早く対応し、代替のホテルや交通もスムーズでした。",
      "预算范围讲得很实在，酒店和机票都没有强推不必要的项目。":
        "予算の説明が誠実で、ホテルも航空券も不要なものを勧められませんでした。",

      "商务差旅酒店怎么选更稳妥": "出張ホテルを賢く選ぶには",
      "位置、早餐、交通、退改政策和发票支持都会影响真实出差效率。":
        "立地、朝食、交通、キャンセル規定、請求書対応はすべて出張の効率に影響します。",
      "家庭旅行订机票要提前看哪些细节": "家族旅行の航空券、早めに確認すべき点",
      "儿童票、行李额度、起降时间和转机距离都会影响全家人的出行体验。":
        "子ども料金、手荷物許容量、発着時間、乗り継ぎの距離は家族全員の体験に影響します。",
      "自由行路线规划不要只堆景点": "個人旅行のルートは観光地を詰め込みすぎない",
      "每日活动密度、城市切换、酒店位置和休息时间要一起考虑。":
        "1日の予定の密度、都市移動、ホテルの立地、休憩時間を合わせて考えましょう。",
      "短途周末游如何提高体验感": "週末の小旅行をもっと楽しむには",
      "减少路上消耗，优先保证住宿舒适度和核心体验，是短途旅行的关键。":
        "移動の負担を減らし、快適な宿泊と主要な体験を優先することが小旅行の鍵です。",
      "酒店预订时别忽略退改规则": "ホテル予約時はキャンセル規定を見落とさない",
      "旺季、展会和节假日价格波动明显，提前确认退改规则可以降低风险。":
        "繁忙期や展示会、祝日は価格変動が大きく、キャンセル規定を早めに確認するとリスクを抑えられます。",
      "多人同行如何控制预算": "大人数旅行で予算を抑えるには",
      "住宿分房、交通方式和每日餐饮标准提前统一，能减少行程中的临时分歧。":
        "部屋割り、交通手段、1日の食事の基準を事前に決めておくと、旅行中の食い違いを減らせます。",
      "关注酒店预订、机票选择、旅行规划和商务差旅中的实用信息。":
        "ホテル予約、航空券選び、旅行計画、出張に役立つ情報をお届けします。",

      "织川文化传媒(济南)有限公司为客户提供酒店预订、旅行咨询、机票方案和定制行程服务。无论是商务差旅、家庭度假还是团队出行，我们都可以根据您的需求提供细致支持。":
        "織川文化伝媒（済南）有限公司は、ホテル予約、旅行相談、航空券プラン、オーダーメイド旅程を提供します。出張、家族旅行、団体旅行のいずれでも、ご要望に合わせてきめ細かくサポートします。",
      "咨询电话": "お問い合わせ電話",
      "公司地址": "所在地",
      "服务时间": "営業時間",
      "周一至周日 09:00-21:00，可根据出行紧急情况沟通。":
        "月〜日 09:00〜21:00、緊急のご旅行にも対応します。",
      "山东省济南市高新区舜义路城投环贸中心J座1406":
        "山東省済南市高新区舜義路城投環貿センターJ棟1406",
      "济南高新区": "済南高新区",
      "城投环贸中心J座1406": "城投環貿センターJ棟1406",

      "姓名：": "お名前：",
      "电话：": "電話：",
      "邮箱：": "メール：",
      "内容：": "内容：",
      "验证码：": "認証コード：",
      "请输入您的称呼": "お名前を入力",
      "请输入您的联系电话": "電話番号を入力",
      "请输入您的邮箱": "メールを入力",
      "请输入您的留言内容": "メッセージを入力",
      "请简单描述酒店、旅行或机票需求": "ホテル・旅行・航空券のご要望を簡単に",
      "请输入右边的验证码": "右の認証コードを入力",
      "请输入您的姓名。": "お名前を入力してください。",
      "请输入正确的联系电话。": "正しい電話番号を入力してください。",
      "验证码不正确，请重新输入。": "認証コードが正しくありません。再入力してください。",
      "留言已记录在前端演示中，正式上线时可接入后台。":
        "このメッセージはフロントエンドのデモに記録されました。公開時にバックエンドと連携できます。",

      "甄选酒店、旅行咨询、特惠机票与定制行程，覆盖商务差旅、家庭度假与团队出行。":
        "厳選ホテル、旅行コンサルティング、お得な航空券、オーダーメイド旅程で、出張・家族旅行・団体旅行をカバーします。",
      "以酒店、旅行、机票服务为核心，为客户整理更清晰、更省心的出行方案。":
        "ホテル・旅行・航空券サービスを軸に、より明確で安心な旅行プランを整理します。",
      "需要酒店、旅行、机票咨询时，可以通过电话或留言与我们联系。":
        "ホテル・旅行・航空券のご相談は、お電話またはメッセージでご連絡ください。",
      "以规范沟通、资源匹配和出行保障为服务基础，为客户提供可信赖的酒店、旅行和机票咨询。":
        "明確なコミュニケーション、リソースのマッチング、旅のサポートを基盤に、信頼できるホテル・旅行・航空券の相談を提供します。",
      "来自酒店预订、机票咨询、商务差旅和家庭旅行客户的真实体验反馈。":
        "ホテル予約、航空券相談、出張、家族旅行のお客様からの実際の声です。",

      "公司位于山东省济南市高新区舜义路城投环贸中心J座1406，主营酒店、旅行、机票相关服务，面向商务差旅、家庭度假、团队出行和自由行客户提供咨询与方案支持。":
        "山東省済南市高新区舜義路城投環貿センターJ棟1406に所在し、ホテル・旅行・航空券関連サービスを主軸に、出張・家族旅行・団体旅行・個人旅行のお客様へ相談とプラン支援を提供します。",
      "我们重视信息准确度和服务响应速度，从客户需求出发，帮助客户梳理酒店选择、航班安排、行程节奏和预算控制，尽量把复杂的出行信息变得清楚可执行。":
        "情報の正確さと対応の速さを重視し、お客様のニーズを起点に、ホテル選び、フライト手配、旅程のペース、予算管理を整理し、複雑な情報を明確で実行可能にします。",
      "无论是临时商务出行，还是提前规划的假期旅程，我们都希望用稳定、细致的服务，让客户少花时间协调，多一些从容出发的确定感。":
        "急な出張でも、前もって計画した休暇でも、安定したきめ細かなサービスで、調整の手間を減らし、安心して出発できる確かさをお届けします。",
      "服务理念": "サービス理念",
      "真实需求优先": "本当のニーズを優先",
      "先理解客户出行目的，再推荐酒店、航班和路线。":
        "まずお客様の目的を理解し、その上でホテル・フライト・ルートを提案します。",
      "信息清楚透明": "明確で透明",
      "把价格、时间、规则和风险点讲清楚，方便客户判断。":
        "価格・時間・規定・リスクを明確に説明し、判断しやすくします。",
      "执行稳定可靠": "安定した実行",
      "行前确认关键节点，途中保持响应，降低临时变动影响。":
        "出発前に重要事項を確認し、移動中も対応を続け、急な変更の影響を抑えます。",
      "长期服务意识": "長期的な視点",
      "积累客户偏好，为后续差旅和旅行提供更高效的支持。":
        "お客様の好みを蓄積し、今後の出張や旅行をより効率的に支援します。",

      "根据城市位置、房型、价格、早餐、交通和退改政策筛选酒店，适配商务差旅、家庭度假和团队入住需求。":
        "都市の立地、部屋タイプ、価格、朝食、交通、キャンセル規定からホテルを選び、出張・家族・団体の宿泊に対応します。",

      "公司信息、服务范围和沟通流程清晰透明，围绕客户真实出行需求提供咨询与方案支持。":
        "会社情報、サービス範囲、コミュニケーションが明確で透明、お客様の実際のニーズに沿って相談とプランを提供します。",
      "酒店资源": "ホテルリソース",
      "关注酒店位置、房型、配套、退改规则和综合体验，帮助客户筛选更适合的住宿选择。":
        "立地、部屋タイプ、設備、キャンセル規定、総合的な体験に注目し、より適した宿泊を選びます。",
      "票务方案": "チケットプラン",
      "结合航线、时间、预算、行李额度和中转安排提供机票方案参考，降低客户比价压力。":
        "路線、時間、予算、手荷物、乗り継ぎを踏まえた航空券の参考案を提供し、比較の負担を軽減します。",
      "服务保障": "サービス保証",
      "覆盖需求确认、行前提醒、途中沟通和行后反馈，帮助客户应对行程变化。":
        "要望確認、出発前リマインド、移動中の連絡、帰着後のフィードバックをカバーし、変更に対応します。",

      "商务差旅客户": "出張のお客様",
      "家庭旅行客户": "家族旅行のお客様",
      "机票咨询客户": "航空券相談のお客様",
      "团队出行客户": "団体旅行のお客様",
      "自由行客户": "個人旅行のお客様",
      "临时出行客户": "急な旅行のお客様",
      "酒店位置和房型推荐很准确，离会议地点近，发票和退改也提前确认好了。":
        "ホテルの立地と部屋が的確で会場に近く、請求書やキャンセル規定も事前に確認できました。",
      "一家人出游最怕节奏太赶，这次酒店和行程安排都比较舒服，孩子也玩得开心。":
        "家族旅行は詰め込みが心配ですが、今回はホテルも日程も快適で、子どもも楽しめました。",
      "机票方案对比很清楚，帮我避开了时间不合适的中转，整体价格也合理。":
        "航空券の比較が分かりやすく、不便な乗り継ぎを避けられ、価格も妥当でした。",
      "多人出行沟通复杂，他们把酒店、交通和集合时间整理得很清楚，执行很顺。":
        "団体旅行は調整が大変ですが、ホテル・交通・集合時間を分かりやすくまとめてくれ、スムーズでした。",
      "路线建议很实在，没有堆太多景点，每天留了休息时间，旅行体验轻松很多。":
        "ルート提案が現実的で、観光を詰め込みすぎず、毎日休憩時間もあり、ゆったり旅行できました。",
      "临时订票和改酒店都处理得比较快，重要信息会及时提醒，心里踏实。":
        "急な予約やホテル変更も素早く対応し、重要な情報も適時に知らせてくれて安心でした。",

      "搜索结果": "検索結果",
      "根据位置、房型、价格、早餐、交通和退改政策筛选酒店。":
        "立地、部屋タイプ、価格、朝食、交通、キャンセル規定でホテルを選びます。",
      "提供航班时间、价格、行李额度、中转方案和退改规则对比。":
        "フライト時間、価格、手荷物、乗り継ぎ、キャンセル規定を比較します。",
      "围绕目的地、天数、预算和同行人情况提供路线建议。":
        "目的地、日数、予算、同行者に応じてルートを提案します。",
      "为亲子、情侣、商务、小团体等场景设计专属行程。":
        "親子、カップル、ビジネス、小グループ向けの専用旅程を設計します。",
      "电话：15866703327，地址：山东省济南市高新区舜义路城投环贸中心J座1406。":
        "電話：15866703327　住所：山東省済南市高新区舜義路城投環貿センターJ棟1406",
      "没有找到匹配内容，请更换关键词或直接联系我们。":
        "該当する内容が見つかりません。キーワードを変えるか、直接お問い合わせください。",

      "栏目：服务范围　联系电话：15866703327": "カテゴリ：サービス　電話：15866703327",
      "一个稳定的旅程，离不开合适的住宿安排。我们会结合客户的出行目的、预算范围、交通位置、房型需求和入住偏好，筛选更适合的酒店选择。":
        "快適な旅には適した宿泊が欠かせません。目的、予算、立地、部屋の希望、宿泊の好みに合わせて最適なホテルを選びます。",
      "商务差旅更重视交通效率、早餐时间、发票支持和退改规则；家庭度假更关注房型面积、亲子配套、周边餐饮和入住舒适度。不同场景需要不同的判断标准。":
        "出張では交通効率、朝食時間、請求書対応、キャンセル規定が重視され、家族旅行では部屋の広さ、子ども向け設備、周辺の食事、快適さが重要です。場面ごとに基準は異なります。",
      "商务酒店、度假酒店、亲子酒店、团队酒店咨询": "ビジネス・リゾート・ファミリー・団体向けホテルの相談",
      "酒店位置、价格、房型、早餐、退改政策对比": "ホテルの立地、価格、部屋タイプ、朝食、キャンセル規定の比較",
      "入住前关键信息提醒和临时调整协助": "チェックイン前の重要事項のリマインドと急な変更のサポート",
      "机票选择不只是比较价格，还要综合航班时间、行李额度、中转距离、退改规则和同行人状态。我们会帮助客户把可选方案整理清楚，减少反复切换平台比价的成本。":
        "航空券選びは価格だけでなく、発着時間、手荷物、乗り継ぎ距離、キャンセル規定、同行者も考慮します。選択肢を整理し、複数サイトでの比較の手間を減らします。",
      "针对商务差旅、家庭出行、学生返程、临时出行等场景，我们会优先筛选更稳妥的时间组合，兼顾价格与出行效率。":
        "出張、家族旅行、学生の帰省、急な移動などに対し、価格と効率を両立する確実な時間の組み合わせを優先します。",
      "国内与国际航线机票方案咨询": "国内・国際線の航空券プラン相談",
      "直飞、中转、早晚班机和行李规则对比": "直行・乗り継ぎ・早朝/深夜便・手荷物規定の比較",
      "多人同行、儿童老人出行、临时调整协助": "団体、子ども・高齢者の移動、急な変更のサポート",
      "好的旅行规划，需要在“想去哪里”和“怎么去更舒服”之间找到平衡。我们会根据客户天数、预算、同行人结构和兴趣偏好，提供目的地选择、路线节奏和住宿交通建议。":
        "良い旅行計画は「どこへ行くか」と「いかに快適に行くか」のバランスです。日数、予算、同行者、興味に応じて、目的地選び、ルートのペース、宿泊・交通を提案します。",
      "对于第一次去的目的地，我们会重点提示城市切换、景点距离、当地交通、季节天气和每日活动密度，避免把旅行做成赶路清单。":
        "初めての目的地では、都市移動、観光地間の距離、現地交通、季節の天候、1日の予定の密度を重点的にお伝えし、移動だらけの旅にならないようにします。",
      "自由行、家庭游、商务游、团队游路线建议": "個人・家族・ビジネス・団体旅行のルート提案",
      "目的地选择、交通衔接、酒店区域分析": "目的地選び、交通の接続、ホテルエリアの分析",
      "行前提醒、当地体验和临时调整建议": "出発前のリマインド、現地体験、急な変更の提案",
      "定制行程适合对时间、住宿、交通和体验有明确要求的客户。我们会把酒店、机票、交通衔接和每日安排整合成清楚的出行方案，减少客户自己协调多个环节的压力。":
        "オーダーメイド旅程は、時間・宿泊・交通・体験に明確な希望があるお客様に最適です。ホテル、航空券、交通の接続、毎日の予定を分かりやすいプランに統合し、調整の負担を減らします。",
      "无论是亲子度假、情侣旅行、商务接待还是小团队出游，我们都会根据实际场景控制节奏，避免行程过满，同时保留必要的机动空间。":
        "家族旅行、カップル旅行、ビジネス接待、小グループの旅行など、実際の状況に合わせてペースを調整し、詰め込みすぎを避けつつ、必要な余裕を残します。",
      "亲子、情侣、商务、小团体定制行程": "親子・カップル・ビジネス・小グループのオーダーメイド旅程",
      "住宿、机票、交通、体验项目统筹建议": "宿泊・航空券・交通・体験の統合的な提案",
      "行前清单、关键节点提醒和途中沟通支持": "出発前チェックリスト、重要事項のリマインド、移動中のサポート",
    },

    korean: {
      "网站首页": "홈",
      "服务范围": "서비스",
      "企业资质": "기업 자격",
      "客户反馈": "고객 후기",
      "新闻资讯": "뉴스",
      "关于我们": "회사 소개",
      "联系我们": "문의하기",
      "首页": "홈",
      "尾页": "마지막",
      "搜索...": "검색...",
      "了解更多": "자세히 보기",
      "查看更多": "더 보기",
      "提交": "제출",
      "公司新闻": "회사 뉴스",
      "行业新闻": "업계 뉴스",
      "公司简介": "회사 개요",
      "在线留言": "온라인 문의",
      "Copyright © 2026 织川文化传媒(济南)有限公司": "Copyright © 2026 직천문화미디어(지난)유한공사",
      "织川文化传媒(济南)有限公司": "직천문화미디어(지난)유한공사",
      "关注我们": "팔로우하기",

      "/ 服务范围": "/ 서비스",
      "/ 关于我们": "/ 회사 소개",
      "/ 联系我们": "/ 문의하기",
      "/ 企业资质": "/ 기업 자격",
      "/ 新闻资讯": "/ 뉴스",
      "/ 客户反馈": "/ 고객 후기",
      ">> 甄选酒店": ">> 엄선 호텔",
      ">> 特惠机票": ">> 특가 항공권",
      ">> 旅行咨询": ">> 여행 컨설팅",
      ">> 定制行程": ">> 맞춤 일정",
      ">> 搜索结果": ">> 검색 결과",

      "甄选酒店、安心旅行、便捷机票，让每一次出发都更从容":
        "엄선한 호텔, 안심 여행, 편리한 항공권으로 모든 출발을 더 여유롭게.",
      "我们围绕酒店、旅行和机票三类核心需求，为商务差旅、家庭度假、团队出行和自由行客户提供清晰、稳定、贴心的出行服务。":
        "호텔, 여행, 항공권이라는 세 가지 핵심 요구를 중심으로 비즈니스 출장, 가족 휴가, 단체 여행, 자유 여행 고객에게 명확하고 안정적이며 세심한 서비스를 제공합니다.",
      "从酒店筛选、票务方案、路线建议到出行提醒，我们把复杂信息整理成可执行的方案，让客户少花时间比价和协调，把精力留给真正的旅程体验。":
        "호텔 선정, 발권, 경로 제안부터 출발 알림까지 복잡한 정보를 실행 가능한 계획으로 정리하여, 고객이 비교와 조율에 드는 시간을 줄이고 여행 자체에 집중할 수 있도록 합니다.",

      "甄选酒店": "엄선 호텔",
      "旅行咨询": "여행 컨설팅",
      "特惠机票": "특가 항공권",
      "定制行程": "맞춤 일정",

      "根据位置、预算、房型、配套和真实体验筛选酒店，兼顾商务效率、度假舒适度和家庭出行便利性。":
        "위치, 예산, 객실 타입, 편의시설, 실제 이용 경험을 기준으로 호텔을 선별하여 비즈니스 효율, 휴양 편안함, 가족 여행 편의성을 모두 고려합니다.",
      "围绕目的地、天数、预算和同行人情况提供路线建议、节奏安排、用车导览和当地体验咨询。":
        "목적지, 일수, 예산, 동행자에 맞춰 경로 제안, 일정 배분, 차량·가이드, 현지 체험 상담을 제공합니다.",
      "结合航线、舱位、日期和中转策略匹配机票方案，帮助客户在价格、时间和舒适度之间做出合适选择。":
        "노선, 좌석 등급, 날짜, 경유 전략을 고려해 항공권을 매칭하여 가격, 시간, 편안함의 균형을 돕습니다.",
      "为亲子、情侣、商务、小团体等场景设计专属行程，覆盖住宿、交通、游玩安排和出行提醒。":
        "가족, 커플, 비즈니스, 소그룹 등 상황에 맞는 전용 일정을 설계하여 숙박, 교통, 관광, 출발 알림까지 포함합니다.",

      "合规经营": "규정 준수 운영",
      "酒店、票务与行程咨询流程清晰，需求确认、方案沟通和服务响应透明可追踪。":
        "호텔, 발권, 일정 상담 절차가 명확하며 요구 확인, 제안 소통, 응대가 투명하고 추적 가능합니다.",
      "资源合作": "자원 협력",
      "持续对接酒店、航司、目的地服务商与本地出行资源，提升方案匹配效率。":
        "호텔, 항공사, 목적지 서비스 업체, 현지 이동 자원과 지속적으로 연계하여 매칭 효율을 높입니다.",
      "出行保障": "여행 보장",
      "行前确认、途中提醒、临时调整和行后反馈覆盖完整旅程。":
        "출발 전 확인, 이동 중 알림, 임시 변경, 여행 후 피드백까지 전 여정을 아우릅니다.",

      "为什么选择我们": "선택하는 이유",
      "专业定制服务": "전문 맞춤 서비스",
      "根据出行目的、预算、时间和同行人需求制定方案，减少无效比价和反复沟通。":
        "여행 목적, 예산, 시간, 동행자에 맞춰 계획을 세워 불필요한 비교와 반복 소통을 줄입니다.",
      "多元资源网络": "다양한 자원 네트워크",
      "对接酒店、航司、当地用车、导览和目的地体验资源，提升出行匹配效率。":
        "호텔, 항공사, 현지 차량, 가이드, 목적지 체험 자원과 연계하여 매칭 효율을 높입니다.",
      "全流程出行保障": "전 과정 보장",
      "从行前咨询到临时调整，关键节点都有专人跟进。":
        "출발 전 상담부터 임시 변경까지 핵심 단계마다 전담 직원이 챙깁니다.",
      "高标准服务质量": "높은 서비스 품질",
      "持续优化咨询、报价、确认和反馈流程，让出行服务更稳定。":
        "상담, 견적, 확인, 피드백 절차를 지속적으로 개선하여 더 안정적인 서비스를 제공합니다.",
      "丰富行业经验": "풍부한 업계 경험",
      "熟悉商务差旅、家庭度假、自由行、团队出游和票务方案的差异化需求。":
        "비즈니스 출장, 가족 휴가, 자유 여행, 단체 여행, 발권의 서로 다른 요구를 잘 이해합니다.",
      "客户至上理念": "고객 우선 철학",
      "倾听真实出行需求，提供更贴合场景的建议，帮助客户做出清晰选择。":
        "실제 여행 요구를 경청하고 상황에 맞는 조언으로 고객이 명확하게 선택하도록 돕습니다.",

      "酒店位置和房型推荐很准确，商务出差节省了不少筛选时间。":
        "호텔 위치와 객실 추천이 정확해서 출장 시 선택 시간을 많이 절약했습니다.",
      "旅行路线安排得不赶，老人和孩子的需求都提前考虑到了。":
        "여행 일정이 빡빡하지 않았고 어르신과 아이의 필요도 미리 배려해 주었습니다.",
      "机票方案给得很清楚，价格、时间和中转选择都能对比。":
        "항공권 안이 명확해서 가격, 시간, 경유 선택을 비교할 수 있었습니다.",
      "临时调整行程时响应很快，替代酒店和交通都衔接得上。":
        "일정 변경에도 빠르게 대응했고 대체 호텔과 교통도 잘 연결되었습니다.",
      "预算范围讲得很实在，酒店和机票都没有强推不必要的项目。":
        "예산 안내가 솔직했고 호텔과 항공권 모두 불필요한 항목을 강요하지 않았습니다.",

      "商务差旅酒店怎么选更稳妥": "출장 호텔을 더 현명하게 고르는 법",
      "位置、早餐、交通、退改政策和发票支持都会影响真实出差效率。":
        "위치, 조식, 교통, 취소 규정, 영수증 지원이 모두 실제 출장 효율에 영향을 줍니다.",
      "家庭旅行订机票要提前看哪些细节": "가족 여행 항공권 예약 시 미리 봐야 할 점",
      "儿童票、行李额度、起降时间和转机距离都会影响全家人的出行体验。":
        "어린이 요금, 수하물 허용량, 이착륙 시간, 환승 거리가 온 가족의 여행 경험에 영향을 줍니다.",
      "自由行路线规划不要只堆景点": "자유 여행 경로, 명소만 쌓지 마세요",
      "每日活动密度、城市切换、酒店位置和休息时间要一起考虑。":
        "하루 활동 밀도, 도시 이동, 호텔 위치, 휴식 시간을 함께 고려해야 합니다.",
      "短途周末游如何提高体验感": "주말 근거리 여행을 더 즐기는 법",
      "减少路上消耗，优先保证住宿舒适度和核心体验，是短途旅行的关键。":
        "이동 소모를 줄이고 편안한 숙박과 핵심 체험을 우선하는 것이 근거리 여행의 핵심입니다.",
      "酒店预订时别忽略退改规则": "호텔 예약 시 취소 규정을 놓치지 마세요",
      "旺季、展会和节假日价格波动明显，提前确认退改规则可以降低风险。":
        "성수기, 박람회, 연휴에는 가격 변동이 크므로 취소 규정을 미리 확인하면 위험을 줄일 수 있습니다.",
      "多人同行如何控制预算": "여러 명이 함께할 때 예산 관리법",
      "住宿分房、交通方式和每日餐饮标准提前统一，能减少行程中的临时分歧。":
        "객실 배정, 교통 수단, 하루 식사 기준을 미리 통일하면 여행 중 갈등을 줄일 수 있습니다.",
      "关注酒店预订、机票选择、旅行规划和商务差旅中的实用信息。":
        "호텔 예약, 항공권 선택, 여행 계획, 비즈니스 출장에 유용한 정보를 전합니다.",

      "织川文化传媒(济南)有限公司为客户提供酒店预订、旅行咨询、机票方案和定制行程服务。无论是商务差旅、家庭度假还是团队出行，我们都可以根据您的需求提供细致支持。":
        "직천문화미디어(지난)유한공사는 호텔 예약, 여행 상담, 항공권 안, 맞춤 일정 서비스를 제공합니다. 비즈니스 출장, 가족 휴가, 단체 여행 어느 경우든 고객의 요구에 맞춰 세심하게 지원합니다.",
      "咨询电话": "상담 전화",
      "公司地址": "주소",
      "服务时间": "운영 시간",
      "周一至周日 09:00-21:00，可根据出行紧急情况沟通。":
        "월~일 09:00~21:00, 긴급 여행 상황에 따라 상담 가능합니다.",
      "山东省济南市高新区舜义路城投环贸中心J座1406":
        "산둥성 지난시 가오신구 순이로 청터우환마오센터 J동 1406",
      "济南高新区": "지난 가오신구",
      "城投环贸中心J座1406": "청터우환마오센터 J동 1406",

      "姓名：": "이름:",
      "电话：": "전화:",
      "邮箱：": "이메일:",
      "内容：": "내용:",
      "验证码：": "인증번호:",
      "请输入您的称呼": "이름을 입력하세요",
      "请输入您的联系电话": "전화번호를 입력하세요",
      "请输入您的邮箱": "이메일을 입력하세요",
      "请输入您的留言内容": "메시지를 입력하세요",
      "请简单描述酒店、旅行或机票需求": "호텔·여행·항공권 요청을 간단히 적어주세요",
      "请输入右边的验证码": "오른쪽 인증번호를 입력하세요",
      "请输入您的姓名。": "이름을 입력해 주세요.",
      "请输入正确的联系电话。": "올바른 전화번호를 입력해 주세요.",
      "验证码不正确，请重新输入。": "인증번호가 올바르지 않습니다. 다시 입력해 주세요.",
      "留言已记录在前端演示中，正式上线时可接入后台。":
        "메시지가 프런트엔드 데모에 기록되었습니다. 정식 오픈 시 백엔드와 연동할 수 있습니다.",

      "甄选酒店、旅行咨询、特惠机票与定制行程，覆盖商务差旅、家庭度假与团队出行。":
        "엄선 호텔, 여행 컨설팅, 특가 항공권, 맞춤 일정으로 비즈니스 출장, 가족 휴가, 단체 여행을 아우릅니다.",
      "以酒店、旅行、机票服务为核心，为客户整理更清晰、更省心的出行方案。":
        "호텔, 여행, 항공권 서비스를 중심으로 고객에게 더 명확하고 편안한 여행 계획을 정리해 드립니다.",
      "需要酒店、旅行、机票咨询时，可以通过电话或留言与我们联系。":
        "호텔, 여행, 항공권 상담이 필요하시면 전화 또는 메시지로 연락 주세요.",
      "以规范沟通、资源匹配和出行保障为服务基础，为客户提供可信赖的酒店、旅行和机票咨询。":
        "규범적 소통, 자원 매칭, 여행 보장을 바탕으로 신뢰할 수 있는 호텔·여행·항공권 상담을 제공합니다.",
      "来自酒店预订、机票咨询、商务差旅和家庭旅行客户的真实体验反馈。":
        "호텔 예약, 항공권 상담, 비즈니스 출장, 가족 여행 고객의 실제 후기입니다.",

      "公司位于山东省济南市高新区舜义路城投环贸中心J座1406，主营酒店、旅行、机票相关服务，面向商务差旅、家庭度假、团队出行和自由行客户提供咨询与方案支持。":
        "산둥성 지난시 가오신구 순이로 청터우환마오센터 J동 1406에 위치하며 호텔, 여행, 항공권 관련 서비스를 주력으로 비즈니스 출장, 가족 휴가, 단체 여행, 자유 여행 고객에게 상담과 계획 지원을 제공합니다.",
      "我们重视信息准确度和服务响应速度，从客户需求出发，帮助客户梳理酒店选择、航班安排、行程节奏和预算控制，尽量把复杂的出行信息变得清楚可执行。":
        "정보의 정확성과 응대 속도를 중시하며 고객 요구에서 출발하여 호텔 선택, 항공편 일정, 여행 페이스, 예산 관리를 정리해 복잡한 정보를 명확하고 실행 가능하게 만듭니다.",
      "无论是临时商务出行，还是提前规划的假期旅程，我们都希望用稳定、细致的服务，让客户少花时间协调，多一些从容出发的确定感。":
        "갑작스러운 출장이든 미리 계획한 휴가든, 안정적이고 세심한 서비스로 고객이 조율에 드는 시간을 줄이고 여유롭게 출발하는 확신을 드리고자 합니다.",
      "服务理念": "서비스 철학",
      "真实需求优先": "실제 요구 우선",
      "先理解客户出行目的，再推荐酒店、航班和路线。":
        "먼저 고객의 여행 목적을 이해한 뒤 호텔, 항공편, 경로를 추천합니다.",
      "信息清楚透明": "명확하고 투명한 정보",
      "把价格、时间、规则和风险点讲清楚，方便客户判断。":
        "가격, 시간, 규정, 위험 요소를 분명히 설명해 고객이 판단하기 쉽게 합니다.",
      "执行稳定可靠": "안정적이고 신뢰할 수 있는 실행",
      "行前确认关键节点，途中保持响应，降低临时变动影响。":
        "출발 전 핵심 사항을 확인하고 이동 중에도 응대하여 임시 변경의 영향을 줄입니다.",
      "长期服务意识": "장기적 서비스 의식",
      "积累客户偏好，为后续差旅和旅行提供更高效的支持。":
        "고객의 선호를 축적해 이후 출장과 여행을 더 효율적으로 지원합니다.",

      "根据城市位置、房型、价格、早餐、交通和退改政策筛选酒店，适配商务差旅、家庭度假和团队入住需求。":
        "도시 위치, 객실 타입, 가격, 조식, 교통, 취소 규정을 기준으로 호텔을 선별해 비즈니스, 가족, 단체 숙박에 맞춥니다.",

      "公司信息、服务范围和沟通流程清晰透明，围绕客户真实出行需求提供咨询与方案支持。":
        "회사 정보, 서비스 범위, 소통 절차가 명확하고 투명하며 고객의 실제 요구에 맞춰 상담과 계획을 지원합니다.",
      "酒店资源": "호텔 자원",
      "关注酒店位置、房型、配套、退改规则和综合体验，帮助客户筛选更适合的住宿选择。":
        "위치, 객실 타입, 편의시설, 취소 규정, 종합 경험을 살펴 더 적합한 숙박을 선별합니다.",
      "票务方案": "발권 방안",
      "结合航线、时间、预算、行李额度和中转安排提供机票方案参考，降低客户比价压力。":
        "노선, 시간, 예산, 수하물, 경유를 결합한 항공권 참고안을 제공해 비교 부담을 줄입니다.",
      "服务保障": "서비스 보장",
      "覆盖需求确认、行前提醒、途中沟通和行后反馈，帮助客户应对行程变化。":
        "요구 확인, 출발 전 알림, 이동 중 소통, 여행 후 피드백을 포괄하여 일정 변화에 대응합니다.",

      "商务差旅客户": "비즈니스 출장 고객",
      "家庭旅行客户": "가족 여행 고객",
      "机票咨询客户": "항공권 상담 고객",
      "团队出行客户": "단체 여행 고객",
      "自由行客户": "자유 여행 고객",
      "临时出行客户": "긴급 여행 고객",
      "酒店位置和房型推荐很准确，离会议地点近，发票和退改也提前确认好了。":
        "호텔 위치와 객실 추천이 정확했고 회의 장소와 가까웠으며 영수증과 취소 규정도 미리 확인해 주었습니다.",
      "一家人出游最怕节奏太赶，这次酒店和行程安排都比较舒服，孩子也玩得开心。":
        "가족 여행은 일정이 빡빡할까 걱정되는데, 이번엔 호텔과 일정이 편안했고 아이도 즐거워했습니다.",
      "机票方案对比很清楚，帮我避开了时间不合适的中转，整体价格也合理。":
        "항공권 비교가 명확해서 불편한 경유를 피할 수 있었고 전체 가격도 합리적이었습니다.",
      "多人出行沟通复杂，他们把酒店、交通和集合时间整理得很清楚，执行很顺。":
        "단체 여행은 소통이 복잡한데 호텔, 교통, 집합 시간을 명확히 정리해 주어 진행이 매끄러웠습니다.",
      "路线建议很实在，没有堆太多景点，每天留了休息时间，旅行体验轻松很多。":
        "경로 제안이 현실적이어서 명소를 너무 많이 넣지 않고 매일 휴식 시간을 두어 훨씬 여유로웠습니다.",
      "临时订票和改酒店都处理得比较快，重要信息会及时提醒，心里踏实。":
        "급한 예약과 호텔 변경도 빠르게 처리했고 중요한 정보를 제때 알려 주어 안심이 되었습니다.",

      "搜索结果": "검색 결과",
      "根据位置、房型、价格、早餐、交通和退改政策筛选酒店。":
        "위치, 객실 타입, 가격, 조식, 교통, 취소 규정으로 호텔을 선별합니다.",
      "提供航班时间、价格、行李额度、中转方案和退改规则对比。":
        "항공편 시간, 가격, 수하물, 경유, 취소 규정을 비교합니다.",
      "围绕目的地、天数、预算和同行人情况提供路线建议。":
        "목적지, 일수, 예산, 동행자에 따라 경로를 제안합니다.",
      "为亲子、情侣、商务、小团体等场景设计专属行程。":
        "가족, 커플, 비즈니스, 소그룹을 위한 전용 일정을 설계합니다.",
      "电话：15866703327，地址：山东省济南市高新区舜义路城投环贸中心J座1406。":
        "전화: 15866703327, 주소: 산둥성 지난시 가오신구 순이로 청터우환마오센터 J동 1406.",
      "没有找到匹配内容，请更换关键词或直接联系我们。":
        "일치하는 내용이 없습니다. 키워드를 바꾸거나 직접 문의해 주세요.",

      "栏目：服务范围　联系电话：15866703327": "카테고리: 서비스　전화: 15866703327",
      "一个稳定的旅程，离不开合适的住宿安排。我们会结合客户的出行目的、预算范围、交通位置、房型需求和入住偏好，筛选更适合的酒店选择。":
        "안정적인 여행에는 알맞은 숙박이 필수입니다. 여행 목적, 예산, 위치, 객실 요구, 숙박 선호를 결합해 더 적합한 호텔을 선별합니다.",
      "商务差旅更重视交通效率、早餐时间、发票支持和退改规则；家庭度假更关注房型面积、亲子配套、周边餐饮和入住舒适度。不同场景需要不同的判断标准。":
        "비즈니스 출장은 교통 효율, 조식 시간, 영수증 지원, 취소 규정을 중시하고, 가족 휴가는 객실 면적, 가족 편의, 주변 식당, 숙박 편안함을 중시합니다. 상황마다 기준이 다릅니다.",
      "商务酒店、度假酒店、亲子酒店、团队酒店咨询": "비즈니스, 리조트, 가족, 단체 호텔 상담",
      "酒店位置、价格、房型、早餐、退改政策对比": "호텔 위치, 가격, 객실 타입, 조식, 취소 규정 비교",
      "入住前关键信息提醒和临时调整协助": "체크인 전 핵심 정보 안내와 임시 변경 지원",
      "机票选择不只是比较价格，还要综合航班时间、行李额度、中转距离、退改规则和同行人状态。我们会帮助客户把可选方案整理清楚，减少反复切换平台比价的成本。":
        "항공권 선택은 가격뿐 아니라 운항 시간, 수하물, 환승 거리, 취소 규정, 동행자 상황을 종합합니다. 선택지를 명확히 정리해 여러 플랫폼을 오가며 비교하는 수고를 줄입니다.",
      "针对商务差旅、家庭出行、学生返程、临时出行等场景，我们会优先筛选更稳妥的时间组合，兼顾价格与出行效率。":
        "비즈니스 출장, 가족 여행, 학생 귀향, 긴급 이동 등 상황에 맞춰 가격과 효율을 함께 고려한 안정적인 시간 조합을 우선 선별합니다.",
      "国内与国际航线机票方案咨询": "국내·국제 노선 항공권 상담",
      "直飞、中转、早晚班机和行李规则对比": "직항, 경유, 이른·늦은 항공편, 수하물 규정 비교",
      "多人同行、儿童老人出行、临时调整协助": "단체 동행, 어린이·노약자 이동, 임시 변경 지원",
      "好的旅行规划，需要在“想去哪里”和“怎么去更舒服”之间找到平衡。我们会根据客户天数、预算、同行人结构和兴趣偏好，提供目的地选择、路线节奏和住宿交通建议。":
        "좋은 여행 계획은 '어디로 갈지'와 '어떻게 더 편하게 갈지' 사이의 균형이 필요합니다. 일수, 예산, 동행 구성, 관심사에 따라 목적지 선택, 경로 페이스, 숙박·교통을 제안합니다.",
      "对于第一次去的目的地，我们会重点提示城市切换、景点距离、当地交通、季节天气和每日活动密度，避免把旅行做成赶路清单。":
        "처음 가는 목적지는 도시 이동, 명소 간 거리, 현지 교통, 계절 날씨, 하루 활동 밀도를 중점적으로 안내하여 이동만 반복하는 여행이 되지 않도록 합니다.",
      "自由行、家庭游、商务游、团队游路线建议": "자유, 가족, 비즈니스, 단체 여행 경로 제안",
      "目的地选择、交通衔接、酒店区域分析": "목적지 선택, 교통 연결, 호텔 지역 분석",
      "行前提醒、当地体验和临时调整建议": "출발 전 알림, 현지 체험, 임시 변경 제안",
      "定制行程适合对时间、住宿、交通和体验有明确要求的客户。我们会把酒店、机票、交通衔接和每日安排整合成清楚的出行方案，减少客户自己协调多个环节的压力。":
        "맞춤 일정은 시간, 숙박, 교통, 체험에 명확한 요구가 있는 고객에게 적합합니다. 호텔, 항공권, 교통 연결, 일일 일정을 명확한 계획으로 통합해 여러 부분을 직접 조율하는 부담을 줄입니다.",
      "无论是亲子度假、情侣旅行、商务接待还是小团队出游，我们都会根据实际场景控制节奏，避免行程过满，同时保留必要的机动空间。":
        "가족 휴가, 커플 여행, 비즈니스 접대, 소그룹 나들이 등 실제 상황에 맞춰 페이스를 조절하여 일정이 과하지 않게 하면서 필요한 여유 공간을 남깁니다.",
      "亲子、情侣、商务、小团体定制行程": "가족, 커플, 비즈니스, 소그룹 맞춤 일정",
      "住宿、机票、交通、体验项目统筹建议": "숙박, 항공권, 교통, 체험 통합 제안",
      "行前清单、关键节点提醒和途中沟通支持": "출발 전 체크리스트, 핵심 단계 알림, 이동 중 소통 지원",
    },
  };

  // Captured originals so any language (including back to Chinese) is reversible.
  var textNodes = null; // [{ node, key, lead, trail }]
  var attrNodes = null; // [{ el, attr, key }]
  var current = "chinese_simplified";

  function isInSkippedContainer(el) {
    return !el || el.closest("script, style, [translate='no']");
  }

  function leadingWhitespace(value) {
    return value.slice(0, value.length - value.replace(/^\s+/, "").length);
  }

  function trailingWhitespace(value) {
    return value.slice(value.replace(/\s+$/, "").length);
  }

  function collect() {
    textNodes = [];
    attrNodes = [];

    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue || !node.nodeValue.trim()) {
          return NodeFilter.FILTER_REJECT;
        }
        if (isInSkippedContainer(node.parentElement)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    var node;
    while ((node = walker.nextNode())) {
      var value = node.nodeValue;
      textNodes.push({
        node: node,
        key: value.trim(),
        lead: leadingWhitespace(value),
        trail: trailingWhitespace(value),
      });
    }

    var placeholderEls = document.querySelectorAll("[placeholder]");
    for (var i = 0; i < placeholderEls.length; i += 1) {
      var el = placeholderEls[i];
      if (isInSkippedContainer(el)) {
        continue;
      }
      attrNodes.push({ el: el, attr: "placeholder", key: el.getAttribute("placeholder").trim() });
    }
  }

  function translate(lang, key) {
    if (lang === "chinese_simplified") {
      return key;
    }
    var table = dict[lang];
    return (table && table[key]) || key;
  }

  function apply(lang) {
    if (!HTML_LANG[lang]) {
      lang = "chinese_simplified";
    }
    if (!textNodes) {
      collect();
    }
    current = lang;

    for (var i = 0; i < textNodes.length; i += 1) {
      var item = textNodes[i];
      item.node.nodeValue = item.lead + translate(lang, item.key) + item.trail;
    }
    for (var j = 0; j < attrNodes.length; j += 1) {
      var attr = attrNodes[j];
      attr.el.setAttribute(attr.attr, translate(lang, attr.key));
    }

    document.documentElement.lang = HTML_LANG[lang];
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (error) {
      /* storage may be unavailable; ignore */
    }
  }

  window.i18n = {
    apply: apply,
    /** Translate a single string to the current language (for JS-generated text). */
    t: function (chinese) {
      return translate(current, chinese);
    },
    get current() {
      return current;
    },
    STORAGE_KEY: STORAGE_KEY,
  };
})();
