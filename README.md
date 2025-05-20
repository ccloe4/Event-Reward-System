# Event Reward System (NestJS + MSA + MongoDB)

## 실행 방법

root directory 에서 docker-compose up --build 로 실행
각 app 은 gateway - 3000, auth - 3001, event - 3002 port 로 실행됨
외부에서는 gateway 로만 요청을 보낼 수 있음.
auth 와 event 서버는 docker container 내부적으로만 port 를 사용.

각 관리자 역할 계정의 id 와 password 는 소문자(역할) 로 init-mongodb.js 가 실행되면서 생성됨.
admin, admin, ADMIN

gateway/auth.controller.ts - auth 로 가는 API 처리
gateway/event.controller.ts - event 로 가는 API 처리

event 내에서 scheduler 가 1분마다 등록된 event 의 종료 날짜가 지나면 isActive false 로 변경