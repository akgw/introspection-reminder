export interface Appraisal {
  jan: string; // janコード
  name: string; // 商品名
  images: string[]; // 画像
  manufacturer: string; // メーカー
  largeCategory: string; // 大カテゴリ
  category: string; // カテゴリ
  appraisal: string; // 査定額
  maxAppraisal: string; // buysellでのMAX査定額
  newAppraisal: string; // 新品査定額
  condition3Appraisal: string; // 美品査定額
  condition5Appraisal: string; // 良品査定額
  condition6Appraisal: string; // 並品査定額
  updatedAt: string; // 更新日
  isOneprice: boolean; //ワンプライスかどうか
  isManual: boolean; // マニュアルデータかどうか
  url: string;
  sort?: number;
}