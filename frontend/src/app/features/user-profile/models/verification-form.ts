import { ITeam } from '../../../shared/models/team';

export interface IVerificationForm {
  reasoning: string;
  representedTeams: ITeam[];
}
