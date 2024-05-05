import { memo } from "react";
import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";

export type DataNode = {
  label?: string;
};

function DataNode({
  data,
}: NodeProps<DataNode>) {

  return (
    // We add this class to use the same styles as React Flow's default nodes.
    <div className="react-flow__node-default">
      <Handle type="source" position={Position.Top} />  
      {data.label && <div>{data.label}</div>}
      <div>wow</div>
      <Handle type="target" position={Position.Bottom} />
    </div>
  );
}

export default memo(DataNode)
