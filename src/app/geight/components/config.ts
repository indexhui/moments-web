// 題目別名對照表
// key: 資料庫中的 question 文字
// value: 要合併到的題目 key（用於統計合併）
// 例如 "EV_01_02" 和 "只剩下博愛座" 會合併成同一題
export const questionAliases: Record<string, string> = {
  Entry_20_4: "只剩下博愛座",
  // 可以繼續新增其他別名...
}

// 題目顯示名稱對照表
// key: 題目 key（合併後的）
// value: 要顯示的標題文字
export const questionDisplayNames: Record<string, string> = {
  只剩下博愛座: "走上捷運發現只剩下博愛座...",
  "店員做錯咖啡，要怎麼做呢？": "店員做錯咖啡，要怎麼做呢？",
  "今天要怎麼去公司呢？": "腳好痛...今天要怎麼去公司呢？",
}

// 要顯示的題目清單（依此順序顯示）
// 留空陣列 [] 則顯示所有題目
// 使用合併後的題目 key
export const displayQuestions: string[] = ["店員做錯咖啡，要怎麼做呢？", "今天要怎麼去公司呢？", "只剩下博愛座", "鬧鐘響了"]

// 問題對應圖片設定
// key: 題目 key（合併後的）
// value: 圖片路徑（放在 public 資料夾下）
export const questionImages: Record<string, string> = {
  "店員做錯咖啡，要怎麼做呢？": "/event/Mart.jpg",
  "今天要怎麼去公司呢？": "/event/Street.png",
  只剩下博愛座: "/event/MRT.png",
  鬧鐘響了: "",
}

// 吐槽語錄設定
// key: 問題文字
// value: 依選項對應的吐槽語錄（key 為選項文字）
export const answerQuotes: Record<string, Record<string, string>> = {
  // "選項A": "選項A最多時顯示的吐槽語錄",
  // "選項B": "選項B最多時顯示的吐槽語錄",
  "店員做錯咖啡，要怎麼做呢？": {
    將錯就錯: "命運既已成形，我便飲下這杯錯誤。",
    跟店員說: "那個...不好意思...這不是我的咖灰...（ I 人模式）",
  },
  "今天要怎麼去公司呢？": {
    "腳底好痛，今天搭計程車吧": "今天把錢當止痛藥。",
    像往常一樣搭捷運上班好了: "專業社畜沒有痛處！",
  },
  只剩下博愛座: {
    坐: "這一屁股坐下去，就是一場道德審判的開始。",
    "博愛座呀....": "此乃禁忌之座，不可輕易觸碰。",
  },
}

// 自動輪播間隔時間（毫秒）
export const AUTO_PLAY_INTERVAL = 8000

// 比例條動畫時間（毫秒）
export const BAR_ANIMATION_DURATION = 1000
