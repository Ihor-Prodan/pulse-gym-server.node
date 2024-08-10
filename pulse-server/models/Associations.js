import DataCard from './DataCard.js';
import Membership from './Membership.js';
import User from './User.js';
import Workout from './Workout.js';
import Trainers from './Trainers.js';

// User.hasOne(Membership, {
//   foreignKey: 'userId',
//   as: 'membership'
// });
//
// Membership.belongsTo(User, {
//   foreignKey: 'userId',
//   as: 'user'
// });

User.hasOne(Membership, { foreignKey: 'userId' });
Membership.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Workout, {
  foreignKey: 'userId',
  as: 'workouts'
});

Workout.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

User.hasOne(DataCard, {
  foreignKey: 'userId',
  as: 'dataCard'
});

DataCard.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

Workout.belongsTo(Trainers);
Trainers.hasMany(Workout);

export { User, Membership, DataCard, Workout, Trainers };
