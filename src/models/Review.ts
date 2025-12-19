import { DataTypes, Model, UUIDV4 } from "sequelize";
import sequelize from "../config/database";

class Review extends Model {
  public id!: string;
  public movieId!: string;
  public userId!: string;
  public review!: string;
}

Review.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    movieId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Review",
  }
);

export default Review;
