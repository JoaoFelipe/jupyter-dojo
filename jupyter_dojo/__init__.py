from IPython.display import display, JSON
import json

# Running `npm run build` will create static resources in the static
# directory of this Python package (and create that directory if necessary).

def _jupyter_labextension_paths():
    return [{
        'name': 'jupyter_dojo',
        'src': 'static',
    }]

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'jupyter_dojo',
        'require': 'jupyter_dojo/extension'
    }]

# A display class that can be used within a notebook. 
#   from jupyterlab_dojotools import unittest
#   unittest(data)
    
class unittest(JSON):
    """A display class for displaying unittest visualizations in the Jupyter Notebook and IPython kernel.
    
    unittest expects a JSON-able dict, not serialized JSON strings.

    Scalar types (None, number, string) are not allowed, only dict containers.
    """

    def _ipython_display_(self):
        bundle = {
            'application/unittest.status+json': self.data,
            'text/plain': '<jupyter_dojo.unittest object>'
        }
        metadata = {
            'application/unittest.status+json': self.metadata
        }
        display(bundle, metadata=metadata, raw=True) 
