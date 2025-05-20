db = db.getSiblingDB('auth');
db.createUser({
  user: 'auth_user',
  pwd: 'password',
  roles: [{ role: 'readWrite', db: 'auth' }],
});

db.createCollection('users');

db.users.insertMany([
  {
    userId: 'admin',
    password: '$2b$10$XjyMpfIvF9D9vG994Q71iuwn/8Bw6zmAb05B7BbKImCKzUFvP4uhq',
    roles: ['ADMIN'],
  },
  {
    userId: 'operator',
    password: '$2b$10$a7Vows6em3wPgSXNQ5inau5NwZaisqXaHjS3fECsf1J0uUFKCkMXW',
    roles: ['OPERATOR'],
  },
  {
    userId: 'auditor',
    password: '$2b$10$IFW7xH0VxtWNdzOeJJ9c/uUT6rHW2f6.6T6lpL3dvHP.5Wh24Z36W',
    roles: ['AUDITOR'],
  },
]);

db = db.getSiblingDB('event');
db.createUser({
  user: 'event_user',
  pwd: 'password',
  roles: [{ role: 'readWrite', db: 'event' }],
});
