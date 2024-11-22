import React from 'react';
import { Helmet } from 'react-helmet-async';

export function AppHelmet(): JSX.Element {
  return (
    <Helmet>
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content="http://memory-todo.s3-website.ap-northeast-2.amazonaws.com/"
      />
      <meta property="og:site_name" content="< memoryTodo />" />
      <meta property="og:title" content="< memoryTodo />" />
      <meta
        property="og:description"
        content="간단한 Todo 리스트와 암기노트를 제공합니다."
      />
      <meta
        property="og:image"
        content="https://memory-todo.s3.ap-northeast-2.amazonaws.com/og_img.png"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="< memoryTodo />" />
      <meta
        name="twitter:description"
        content="간단한 Todo 리스트와 암기노트를 제공합니다."
      />
      <meta
        name="twitter:image"
        content="https://memory-todo.s3.ap-northeast-2.amazonaws.com/og_img.png"
      />
    </Helmet>
  );
}

export function TodoHelmet(): JSX.Element {
  return (
    <Helmet>
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content="http://memory-todo.s3-website.ap-northeast-2.amazonaws.com/"
      />
      <meta property="og:site_name" content="< memoryTodo />" />
      <meta property="og:title" content="Todos" />
      <meta
        property="og:description"
        content="간단한 Todo 리스트와 암기노트를 제공합니다."
      />
      <meta
        property="og:image"
        content="https://memory-todo.s3.ap-northeast-2.amazonaws.com/og_img.png"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Todos" />
      <meta
        name="twitter:description"
        content="간단한 Todo 리스트와 암기노트를 제공합니다."
      />
      <meta
        name="twitter:image"
        content="https://memory-todo.s3.ap-northeast-2.amazonaws.com/og_img.png"
      />
    </Helmet>
  );
}

export function MemoryHelmet(): JSX.Element {
  return (
    <Helmet>
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content="http://memory-todo.s3-website.ap-northeast-2.amazonaws.com/"
      />
      <meta property="og:site_name" content="< memoryTodo />" />
      <meta property="og:title" content="Memory" />
      <meta
        property="og:description"
        content="간단한 Todo 리스트와 암기노트를 제공합니다."
      />
      <meta
        property="og:image"
        content="https://memory-todo.s3.ap-northeast-2.amazonaws.com/og_img.png"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Memory" />
      <meta
        name="twitter:description"
        content="간단한 Todo 리스트와 암기노트를 제공합니다."
      />
      <meta
        name="twitter:image"
        content="https://memory-todo.s3.ap-northeast-2.amazonaws.com/og_img.png"
      />
    </Helmet>
  );
}
