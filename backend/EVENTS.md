Event

- name: `contact-request-received`
- actors: user1, user2
- sender: user1
- receiver: user2
- payload:

  - contactId: contact record id
  - userId: user1 id
  - avatarPath: user1 avatar path
  - username: user1 username
  - firstName: user1 first name
  - lastName: user1 last name

Event

- name: `contact-request-accepted`
- actors: user1, user2
- sender: user2
- receiver: user1
- payload:

  - contactId: contact record id
  - userId: user2 id
  - avatarPath: user2 avatar path
  - username: user2 username
  - firstName: user2 first name
  - lastName: user2 last name
