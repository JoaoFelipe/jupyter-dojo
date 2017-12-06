#!/usr/bin/env python
"""Setup script"""
from setuptools import setup
from setupbase import create_cmdclass, install_npm

CMDCLASS = create_cmdclass([
    'labextension',
    'nbextension'
])
CMDCLASS['labextension'] = install_npm('labextension')
CMDCLASS['nbextension'] = install_npm('nbextension')

try:
    import pypandoc
    LONG = pypandoc.convert('README.md', 'rst')
except (IOError, ImportError):
    LONG = "A JupyterLab and Jupyter Notebook extension for rendering unittest results."


SETUP_ARGS = dict(
    name='jupyter_dojo',
    version='0.3.0',
    packages=['jupyter_dojo'],
    description="A JupyterLab and Jupyter Notebook extension for rendering unittest results",
    long_description=LONG,
    author='Joao Felipe Pimentel',
    author_email='joaofelipenp@gmail.com',
    url='https://github.com/JoaoFelipe/jupyter-dojo',
    license='MIT',
    platforms="Linux, Mac OS X, Windows",
    keywords=['ipython', 'jupyter'],
    classifiers=[
        'Intended Audience :: Developers',
        'Intended Audience :: System Administrators',
        'Intended Audience :: Science/Research',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
    ],
    cmdclass=CMDCLASS,
    install_requires=[
        'notebook>=4.3.0',
        'ipython>=1.0.0',
        'ipython_unittest>=0.3.0',
    ]
)

if __name__ == '__main__':
    setup(**SETUP_ARGS)
