# Jupyter Dojo

A JupyterLab and Jupyter Notebook extension for rendering unittest results.

This project consists in a nbextension for Jupyter Notebooks and a labextension for Jupyter Lab. It adds the following features to Jupyter:
* Test status in toolbar (result of [IPython Unittest](https://github.com/JoaoFelipe/ipython-unittest))
* Argument --previous, to move to previous cells after execution
* Timer, pair programming log, function generation for coding dojo sessions
* Syntax highlight for `%%write {mode}` magic

## Prerequisites

* JupyterLab ^0.30.0 and/or Notebook >=4.3.0

## How to Install

If you use conda, it is possible to install the extensions by running:
```bash
conda install -c conda-forge jupyter_dojo
```

If you do not use conda, or if you want to get the most recent release at any given time (since conda-forge may take a while to update), use the following steps:

```bash
pip install jupyter_dojo
jupyter nbextension enable --py --sys-prefix jupyter_dojo
```

If have npm and Jupyter Lab, the next time you open it, it will ask if you want to rebuild jupyter lab with the extension.

Alternatively, you can install the standalone toolbar in *Jupyter Lab* (without the notebook extension nor ipython-unittest) by running:

```bash
jupyter labextension install @jupyter_dojo/labextension
```

Note that Jupyter Lab extension API is not stable yet. Thus, it is very likely that future versions will break this extension.

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

## Links

- [IPython Unittest](https://github.com/JoaoFelipe/ipython-unittest)
- [Pypi.org](https://pypi.org/project/jupyter-dojo/)
- [Conda Forge Feedstock](https://github.com/conda-forge/jupyter_dojo-Feedstock)
- [Standalone Conda Forge Recipe](https://github.com/conda-forge/staged-recipes/pull/4537)

----

Do not hesitate to contact me:

* João Felipe Pimentel <joaofelipenp@gmail.com>

License Terms
-------------

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

