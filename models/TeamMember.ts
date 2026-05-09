import mongoose, { Schema, model, models } from "mongoose";

export interface ITeamMember {
  name: string;
  role: string;
  bio: string;
  quote: string;
  expertise: string[];
  badge: string;
  badgeColor: string;
  image: string;
  hasImage: boolean;
  icon: string;
  isFounder: boolean;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    bio: { type: String, required: true, trim: true },
    quote: { type: String, required: true, trim: true },
    expertise: { type: [String], default: [] },
    badge: { type: String, required: true, trim: true },
    badgeColor: { type: String, required: true, trim: true },
    image: { type: String, default: "", trim: true },
    hasImage: { type: Boolean, default: false },
    icon: { type: String, required: true, trim: true },
    isFounder: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const TeamMember =
  models.TeamMember ?? model<ITeamMember>("TeamMember", TeamMemberSchema);

export default TeamMember;
