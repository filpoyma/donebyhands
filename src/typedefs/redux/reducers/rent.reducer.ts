import { IRentedToolModel, IRentedTools, ITool } from '~typedefs/models/Tools.model';
import { IExtendsTariffs } from '~typedefs/models/Order.model';

export interface IRentState {
  tools: ITool[];
  rentedTools: IRentedToolModel;
  currentRentedTools: IRentedTools[];
  extendsTariffs: IExtendsTariffs[];
}
