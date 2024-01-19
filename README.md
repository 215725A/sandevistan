# sandevistan
<div id="top"></div>

## 使用技術一覧

<!-- シールド一覧 -->
<!-- 該当するプロジェクトの中から任意のものを選ぶ-->
<p style="display: inline">
  <!-- フロントエンドのフレームワーク一覧 -->
  <img src="https://img.shields.io/badge/-Node.js-000000.svg?logo=node.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <!-- ミドルウェア一覧 -->
  <img src="https://img.shields.io/badge/-Nginx-269539.svg?logo=nginx&style=for-the-badge">
  <!-- インフラ一覧 -->
  <img src="https://img.shields.io/badge/-Docker-1488C6.svg?logo=docker&style=for-the-badge">
</p>

## 目次

1. [プロジェクトについて](#プロジェクトについて)
2. [環境](#環境)
3. [ディレクトリ構成](#ディレクトリ構成)
4. [開発環境構築](#開発環境構築)
5. [トラブルシューティング](#トラブルシューティング)

## プロジェクトについて
### プロジェクト名
講義の課題やテスト勉強に行き詰まっている
大学1・2年生向けの
Sandevistanというプロダクトは
学生の学びを推進するwebサイトです

これは学生同士の交流、情報交換(講義の内容・メモ、過去問、質問)することができ、
[pigu](https://pigu-ryu.web.app/?posts=recent), [Rish](https://rish-ryukyu.com/)とは違って、
ターゲットを絞ることで情報の質と量が高いです。

## 環境
Dockerの構成
|構成要素|使用言語(フレームワーク)|
|:--:|:--:|
|Backend|React.js|
|Frontend|Node.js|
|Database|PostgreSQL|
|Web|Nginx|

## ディレクトリ構成
.
├── README.md<br>
├── backend<br>
│   ├── Dockerfile<br>
│   ├── csv<br>
│   │   └── utf_add_2310.csv<br>
│   ├── package-lock.json<br>
│   ├── package.json<br>
│   └── server.js<br>
├── db<br>
│   ├── Dockerfile<br>
│   ├── csv<br>
│   │   ├── R5_lectures.csv<br>
│   │   └── utf_add_2310.csv<br>
│   └── init<br>
│       └── init.sql<br>
├── docker-compose.yml<br>
├── frontend<br>
│   ├── Dockerfile<br>
│   ├── package-lock.json<br>
│   ├── package.json<br>
│   ├── public<br>
│   │   ├── assets<br>
│   │   │   └── css<br>
│   │   │       ├── bootstrap<br>
│   │   │       │   ├── bootstrap.css<br>
│   │   │       │   ├── bootstrap.css.map<br>
│   │   │       │   ├── bootstrap.min.css<br>
│   │   │       │   └── bootstrap.min.css.map<br>
│   │   │       ├── index.css<br>
│   │   │       ├── lecture.css<br>
│   │   │       └── style.css<br>
│   │   └── index.html<br>
│   └── src<br>
│       ├── App.js<br>
│       ├── Routes.js<br>
│       ├── assets<br>
│       │   └── csv<br>
│       │       └── utf_ken_all.csv<br>
│       ├── classes<br>
│       │   └── Lecture.js<br>
│       ├── contents<br>
│       │   ├── About.js<br>
│       │   ├── Blog.js<br>
│       │   ├── Classes.js<br>
│       │   ├── Home.js<br>
│       │   └── Pages.js<br>
│       ├── index.js<br>
│       ├── pages<br>
│       │   └── Readcsv.js<br>
│       └── partials<br>
│           └── Footer.js<br>
└── nginx<br>
    ├── Dockerfile<br>
    ├── certs<br>
    │   ├── fullchain.pem<br>
    │   └── privkey.pem<br>
    └── nginx.conf<br>

## 開発環境構築
### 動作確認
1. `git clone git@github.com:215725A/sandevistan.git` or  
   `git clone https://github.com/215725A/sandevistan.git`
2. `cd sandevistan`
3. `docker-compose up --build -d`

## トラブルシューティング
※SSl化する上で必要な認証鍵をgithubにあげていません  
[Let's encrypt](https://letsencrypt.org/ja/)を利用して証明書を発行するか、オレオレ証明書(非推奨)を使ってください

※`docker-compose up --build -d`をする前にsandevistanディレクトリ直下に.envファイルを作成し、
```
WDS_SOCKET_PORT=0
```
を書き込んでください

※このプロジェクトはVMで建てたサーバーと通信を行うため、通信先のサーバーが落ちているとうまく動作しません  
Dockerが立ち上がっているなら、[http://localhost:3000](http://localhost:3000)にアクセスできると思います
