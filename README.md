# GX Car Plot

Leaflet と Astro を使用して、地図上の道路網に沿って大量の車両（トラック）アイコンをアニメーション表示するプロジェクトです。
Canvasレンダリングを使用することで、約2000台のマーカーをスムーズに動作させています。

## ✨ 特徴

*   **地図表示**: Leaflet + OpenStreetMap を使用。
*   **道路データ**: GeoJSON形式の道路データ (`N01-07L-2K_Road.shp.geojson`) を読み込み、地図上に描画。
*   **アニメーション**:
    *   道路データ（LineString/MultiLineString）に沿ってマーカーが移動。
    *   交差点（セグメントの接続点）で次の道路を探索し、継続的に移動。
    *   行き止まりの場合は別の地点からリスポーン。
    *   速度は 40km/h 〜 60km/h の間でランダムに設定。
*   **パフォーマンス**: Leafletの `preferCanvas: true` オプションにより、大量のマーカー描画を最適化。
*   **Docker対応**: Nginxを使用した軽量なコンテナイメージを作成可能。

## 🛠️ 使用技術

*   [Astro](https://astro.build/) - Webフレームワーク
*   [Leaflet](https://leafletjs.com/) - 地図ライブラリ
*   TypeScript
*   Docker

## 🚀 ローカルでの実行方法

### 前提条件

*   Node.js (v24 推奨)
*   pnpm

### 手順

1.  依存関係のインストール:
    ```bash
    pnpm install
    ```

2.  開発サーバーの起動:
    ```bash
    pnpm dev
    ```
    ※ 起動時に圧縮された道路データ (`.gz`) が自動的に解凍されます。
    ブラウザで `http://localhost:4321` にアクセスしてください。

## 🐳 Dockerでの実行方法

1.  Dockerイメージのビルド:
    ```bash
    docker build -t gx-car-plot .
    ```
    ※ ビルドプロセス内でデータの解凍が行われます。

2.  コンテナの起動:
    ```bash
    docker run -p 8080:80 gx-car-plot
    ```
    ブラウザで `http://localhost:8080` にアクセスしてください。

## 📁 プロジェクト構成

```text
/
├── public/
│   ├── N01-07L-2K_Road.shp.geojson.gz # 道路データ（圧縮済み）
│   ├── N01-07L-2K_Road.shp.geojson    # 道路データ（自動解凍により生成）
│   └── local_shipping_*.svg           # 車両アイコン
├── scripts/
│   └── prepare-data.mjs               # データ解凍スクリプト
├── src/
│   ├── components/
│   │   └── map.astro                  # 地図コンポーネント（メインロジック）
│   └── pages/
│       └── index.astro                # メインページ
├── Dockerfile                         # Dockerビルド設定
└── astro.config.mjs                   # Astro設定
```

## 📚 出典

*   **道路データ**: [国土数値情報 道路（線）](https://nlftp.mlit.go.jp/ksj/gmlold/datalist/gmlold_KsjTmplt-N01.html) (国土交通省)
*   **アイコン**: [Google Fonts - Material Symbols](https://fonts.google.com/)
