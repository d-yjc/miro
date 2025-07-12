const COLOR_LIGHT_BORDER = "#e5e7eb";
const COLOR_DARK_BG = "#1d1f21";
const COLOR_DARK_BORDER = "#2d3135";
const COLOR_DARK_TEXT = "#a3a3a3";
const COLOR_DARK_HEADER = "#e5e7eb";

/* Functions we re-use throughout multiple tables in @mui/x-data-grid */
export const dataGridClassNames =
  "border border-gray-200 bg-white shadow dark:border-stroke-dark dark:bg-dark-secondary dark:text-gray-200";

export const dataGridSxStyles = (isDarkMode: boolean) => {
  return {
    // Set DataGrid root background and text color
    "& .MuiDataGrid-root": {
      backgroundColor: isDarkMode ? COLOR_DARK_BG : "white",
      color: isDarkMode ? COLOR_DARK_HEADER : "black",
    },
    // Set DataGrid main background
    "& .MuiDataGrid-main": {
      backgroundColor: isDarkMode ? COLOR_DARK_BG : "white",
    },
    // Set DataGrid cell background and text
    "& .MuiDataGrid-cell": {
      backgroundColor: isDarkMode ? COLOR_DARK_BG : "white",
      color: isDarkMode ? COLOR_DARK_HEADER : "black",
      border: "none",
    },
    // Set DataGrid row border
    "& .MuiDataGrid-row": {
      borderBottom: `1px solid ${isDarkMode ? COLOR_DARK_BORDER : COLOR_LIGHT_BORDER}`,
    },
    // Set DataGrid column headers
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: isDarkMode ? COLOR_DARK_BG : "white",
      color: isDarkMode ? COLOR_DARK_HEADER : "black",
      '& [role="row"] > *': {
        backgroundColor: isDarkMode ? COLOR_DARK_BG : "white",
        borderColor: isDarkMode ? COLOR_DARK_BORDER : COLOR_LIGHT_BORDER,
      },
    },
    // Set DataGrid border color
    "& .MuiDataGrid-withBorderColor": {
      borderColor: isDarkMode ? COLOR_DARK_BORDER : COLOR_LIGHT_BORDER,
    },
    // Set DataGrid icon and pagination colors
    "& .MuiIconbutton-root, & .MuiTablePagination-root, & .MuiTablePagination-selectIcon": {
      color: isDarkMode ? COLOR_DARK_TEXT : "inherit",
    },
    // Set DataGrid pagination background and select dropdown
    "& .MuiTablePagination-root": {
      backgroundColor: isDarkMode ? COLOR_DARK_BG : "white",
      color: isDarkMode ? COLOR_DARK_HEADER : "black",
    },
    "& .MuiTablePagination-toolbar": {
      backgroundColor: isDarkMode ? COLOR_DARK_BG : "white",
      color: isDarkMode ? COLOR_DARK_HEADER : "black",
    },
    "& .MuiTablePagination-selectLabel, & .MuiTablePagination-input, & .MuiTablePagination-menuItem": {
      color: isDarkMode ? COLOR_DARK_HEADER : "black",
    },
    "& .MuiInputBase-root": {
      color: isDarkMode ? COLOR_DARK_HEADER : "black",
      backgroundColor: isDarkMode ? COLOR_DARK_BG : "white",
    },
  };
};
