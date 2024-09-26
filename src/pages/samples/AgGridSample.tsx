import {useCallback, useMemo, useRef, useState} from "react";
import { ColDef, ColGroupDef } from "ag-grid-community";
import {AgGridReact} from "ag-grid-react";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {Button} from "@mui/material";

// https://blog.ag-grid.com/full-row-editing-ag-grid-committing-changes-button-click/
// https://www.ag-grid.com/react-data-grid/cell-editing-full-row/
// https://blog.ag-grid.com/next-level-cell-editing-in-ag-grid-with-crud-and-react-hooks/

function ActionCellRenderer(params: any) {
  // console.log('actionCellRenderer: ', params);

  const editingCells = params.api.getEditingCells();
  // checks if the rowIndex matches in at least one of the editing cells
  const isCurrentRowEditing = editingCells.some((cell: any) => {
    return cell.rowIndex === params.node.rowIndex;
  });

  const handleEditClick = useCallback((e: any) => {
    console.log('e: ', e)
    console.log('params: ', params);
    // setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    params.api.startEditingCell({
      rowIndex: params.node.rowIndex,
      // gets the first columnKey
      colKey: params.columnApi.getDisplayedCenterColumns()[0].colId
    });
  }, []);

  const handleSaveClick = () => () => {
    // setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = () => () => {
    console.log('handleDeleteClick');
    // setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = () => () => {
    // setRowModesModel({
    //   ...rowModesModel,
    //   [id]: { mode: GridRowModes.View, ignoreModifications: true },
    // });
    //
    // const editedRow = rows.find((row) => row.id === id);
    // if (editedRow!.isNew) {
    //   setRows(rows.filter((row) => row.id !== id));
    // }
  };

  if (isCurrentRowEditing) {
    return <>
      <Button
        variant="outlined"
        startIcon={<SaveIcon />}
        color="primary"
        size="small"
        sx={{ mr: 1 }}
        onClick={handleSaveClick}
      >save</Button>
      <Button
        variant="outlined"
        startIcon={<CancelIcon />}
        color="error"
        size="small"
        onClick={handleCancelClick}
      >cancel</Button>
    </>;
  } else {
    return <>
      <Button
        variant="outlined"
        startIcon={<EditIcon />}
        color="primary"
        size="small"
        sx={{ mr: 1 }}
        onClick={handleEditClick}
      >edit</Button>
      <Button
        variant="outlined"
        startIcon={<DeleteIcon />}
        color="error"
        size="small"
        onClick={handleDeleteClick}
      >delete</Button>
    </>;
  }
}

function AgGridSample() {
  const gridRef = useRef<AgGridReact>(null);

  const [rowData, setRowData] = useState<any[]>([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { make: "Fiat", model: "500", price: 15774, electric: false },
    { make: "Nissan", model: "Juke", price: 20675, electric: false },
  ]);

  const [columnDefs, setColumnDefs] = useState<
    (ColDef<any, any> | ColGroupDef<any>)[]
  >([
    {
      field: "make",
      // editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['Tesla', 'Ford', 'Toyota'],
      },
      flex: 1
    },
    {
      field: "model",
      // editable: true,
      flex: 1
    },
    {
      field: "price",
      valueFormatter: (p) => "£" + Math.floor(p.value).toLocaleString(),
      flex: 1,
    },
    { field: "electric", flex: 1 },
    {
      headerName: "action",
      minWidth: 280,
      cellRenderer: ActionCellRenderer,
      editable: false,
      colId: "action"
    }
  ]);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      editable: true,
      cellDataType: false, // true이면 만일 boolean 일 경우 체크박스로 나타난다.
    };
  }, []);

  return (
    <div
      style={{ width: "100%", height: "500px" }}
      className={
        "ag-theme-quartz"
      }
    >
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        editType={"fullRow"}
      />
    </div>
  );
}

export default AgGridSample;
