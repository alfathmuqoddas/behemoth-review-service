import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import sequelize from "../config/database";
interface ReviewAttribute {
  id: string;
  movieId: string;
  userId: string;
  userName: string;
  avatar: string;
  rating: number;
  review: string;
}

interface ReviewCreationAttributes extends Optional<ReviewAttribute, "id"> {}

class Review
  extends Model<ReviewAttribute, ReviewCreationAttributes>
  implements ReviewAttribute
{
  public id!: string;
  public movieId!: string;
  public userId!: string;
  public userName!: string;
  public avatar!: string;
  public rating!: number;
  public review!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Review",
    tableName: "reviews",
    schema: "review_service",
    timestamps: true,
  }
);

export default Review;
