import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Group: a
    .model({
      name: a.string().required(),
      adminCode: a.string().required(),
      isAssigned: a.boolean().default(false),
      participants: a.hasMany('Participant', 'groupId'),
    })
    .authorization((allow) => [allow.guest()]),

  Participant: a
    .model({
      name: a.string().required(),
      email: a.string(),
      accessCode: a.string().required(),
      groupId: a.id().required(),
      group: a.belongsTo('Group', 'groupId'),
      assignedToId: a.id(),
      assignedTo: a.belongsTo('Participant', 'assignedToId'),
      assignedFrom: a.hasOne('Participant', 'assignedToId'),
    })
    .authorization((allow) => [allow.guest()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam',
  },
});
