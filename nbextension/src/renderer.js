const MIME_TYPE = 'application/unittest.status+json';

/**
 * Register the mime type and append_mime function with the notebook's
 * output area
 */
export function register_renderer(notebook, dojoView) {
  /* Get an instance of output_area from a CodeCell instance */
  const { output_area } = notebook
    .get_cells()
    .reduce((result, cell) => cell.output_area ? cell : result, {});

  /* A function to render output of 'application/unittest.status+json' mime type */
  const append_mime = function(data, metadata, element) {
    dojoView.renderResult(data);
  };

  /**
   * Register the mime type and append_mime function with output_area
   */
  output_area.register_mime_type(MIME_TYPE, append_mime, {
    safe: true,
    index: 0
  });
}

/**
 * Re-render cells with output data of 'application/unittest.status+json' mime type
 */
export function render_cells(notebook) {
  /* Get all cells in notebook */
  notebook.get_cells().forEach(cell => {
    /* If a cell has output data of 'application/unittest.status+json' mime type */
    if (
      cell.output_area &&
      cell.output_area.outputs.find(
        output => output.data && output.data[MIME_TYPE]
      )
    ) {
      /* Re-render the cell */
      notebook.render_cell_output(cell);
    }
  });
}
