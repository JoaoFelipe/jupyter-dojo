# jupyter_dojo

A JupyterLab and Jupyter Notebook extension for rendering unittest

## Prerequisites

* JupyterLab ^0.30.0 and/or Notebook >=4.3.0

## Usage

To render unittest output in IPython:

```python
In [1]: %load_ext ipython_unittest

In [2]: %%unittest
        assert True
```

## Install

```bash
pip install jupyter_dojo
# For JupyterLab
jupyter labextension install @jupyter_dojo/labextension
jupyter lab build
# For Notebook
jupyter nbextension install --symlink --py --sys-prefix jupyter_dojo
jupyter nbextension enable --py --sys-prefix jupyter_dojo
```

## Development

```bash
pip install -e .
# For JupyterLab
jupyter labextension link labextension
jupyter lab build
# For Notebook
jupyter nbextension install --symlink --py --sys-prefix jupyter_dojo
jupyter nbextension enable --py --sys-prefix jupyter_dojo
```
