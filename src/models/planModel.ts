/* PLAN MODEL */
export interface PlanModel {
  id: number;
  plan_name: string;
  plan_discount: number;
  rooms_min: number | null;
  rooms_max: number | null;
}