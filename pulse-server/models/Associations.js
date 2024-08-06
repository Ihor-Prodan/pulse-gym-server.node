import DataCard from "./DataCard.js";
import Membership from "./Membership.js";
import User from "./User.js";
import Workout from "./Workout.js";
import Trainers from "./Trainers.js";

User.hasOne(Membership);
Membership.belongsTo(User);

User.hasMany(Workout);
Workout.belongsTo(User);

User.hasOne(DataCard);
DataCard.belongsTo(User);

Workout.belongsTo(Trainers);
Trainers.hasMany(Workout);

export { User, Membership, DataCard, Workout, Trainers };
