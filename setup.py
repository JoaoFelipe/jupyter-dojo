#!/usr/bin/env python
"""Setup script

Most of it were obtained from jupyter-matplotlib
"""
import glob
import os
import sys
from distutils import log
from setuptools import setup, find_packages, Command
from setuptools.command.sdist import sdist
from setuptools.command.build_py import build_py
from setuptools.command.egg_info import egg_info
from subprocess import check_call
from os.path import join as pjoin

HERE = os.path.dirname(os.path.abspath(__file__))
IS_REPO = os.path.exists(pjoin(HERE, '.git'))

PY_PACKAGE = "jupyter_dojo"

TARGETS = [
    pjoin(PY_PACKAGE, 'static', 'extension.js'),
    pjoin(PY_PACKAGE, 'static', 'extension.js.map'),
    pjoin(PY_PACKAGE, 'static', 'index.js'),
    pjoin(PY_PACKAGE, 'static', 'index.js.map'),
    pjoin(PY_PACKAGE, 'static', 'package.json'),
]

NPM_INSTALL = [
    pjoin(HERE, "nbextension"),
    pjoin(HERE, "labextension")
]
NPM_PACK = [pjoin(HERE, "labextension")]

TAR_PATH = pjoin(HERE, PY_PACKAGE, '*.tgz')


log.info('setup.py entered')
log.info('$PATH=%s' % os.environ['PATH'])


def js_prerelease(command, strict=False):
    """decorator for building minified js/css prior to another command"""
    class DecoratedCommand(command):
        # pylint: disable=missing-docstring
        # pylint: disable=too-few-public-methods
        # pylint: disable=W0703
        def run(self):
            jsdeps = self.distribution.get_command_obj('jsdeps')
            if not IS_REPO and all(os.path.exists(t) for t in jsdeps.targets):
                # sdist, nothing to do
                command.run(self)
                return

            try:
                self.distribution.run_command('jsdeps')
            except Exception as exc:
                missing = [t for t in jsdeps.targets if not os.path.exists(t)]
                if strict or missing:
                    log.warn('rebuilding js and css failed')
                    if missing:
                        log.error('missing files: %s' % missing)
                    raise exc
                else:
                    log.warn('rebuilding js and css failed (not a problem)')
                    log.warn(str(exc))
            command.run(self)
            update_package_data(self.distribution)
    return DecoratedCommand


def update_package_data(distribution):
    """update package_data to catch changes during setup"""
    build_py = distribution.get_command_obj('build_py')
    # distribution.package_data = find_package_data()
    # re-init build_py options which load package_data
    build_py.finalize_options()


def get_data_files():
    """Get the data files for the package.

    It also moves the .tgz from labextension to PY_PACKAGE
    """
    return [
        ('share/jupyter/nbextensions/{}'.format(PY_PACKAGE), TARGETS),
        ('share/jupyter/lab/extensions', [
            os.path.relpath(f, '.') for f in glob.glob(TAR_PATH)
        ])
    ]



class NPM(Command):
    """NPM Command"""
    # pylint: disable=missing-docstring
    description = 'install package.json dependencies using npm'

    user_options = []

    targets = [
        pjoin(HERE, target) for target in TARGETS
    ]

    def initialize_options(self):
        pass

    def finalize_options(self):
        pass

    def has_npm(self):
        try:
            check_call(['npm', '--version'])
            return True
        except Exception:
            return False

    def should_run_npm_install(self, node_root):
        node_modules_exists = os.path.exists(pjoin(node_root, 'node_modules'))
        return self.has_npm() and not node_modules_exists

    def should_run_npm_pack(self):
        return self.has_npm()

    def run(self):
        has_npm = self.has_npm()
        if not has_npm:
            log.error("`npm` unavailable.  If you're running this command using sudo, make sure `npm` is available to sudo")

        env = os.environ.copy()
        env['PATH'] = os.pathsep.join([
            pjoin(node_root, 'node_modules', '.bin')
            for node_root in NPM_INSTALL
        ] + [os.environ.get('PATH', os.defpath)])

        for node_root in NPM_INSTALL:
            if self.should_run_npm_install(node_root):
                log.info("Installing build dependencies with npm.  This may take a while...")
                check_call(['npm', 'install'], cwd=node_root, stdout=sys.stdout, stderr=sys.stderr)
                os.utime(self.node_modules, None)

        for node_root in NPM_PACK:
            if self.should_run_npm_pack():
                check_call(['npm', 'pack', node_root], cwd=pjoin(HERE, PY_PACKAGE),
                           stdout=sys.stdout, stderr=sys.stderr)

        if TAR_PATH is not None:
            files = glob.glob(TAR_PATH)
            if not files:
                self.targets.append(TAR_PATH)
            else:
                self.targets.extend(files)

        for target in self.targets:
            if not os.path.exists(target):
                msg = 'Missing file: %s' % target
                if not has_npm:
                    msg += '\nnpm is required to build a development version of widgetsnbextension'
                raise ValueError(msg)

            self.distribution.data_files = get_data_files()

            # update package data in case this created new files
            update_package_data(self.distribution)


try:
    import pypandoc
    LONG = pypandoc.convert('README.md', 'rst')
except (IOError, ImportError):
    LONG = "A JupyterLab and Jupyter Notebook extension for rendering unittest results."


SETUP_ARGS = dict(
    name='jupyter_dojo',
    version='0.3.2',
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
    cmdclass={
        'build_py': js_prerelease(build_py),
        'egg_info': js_prerelease(egg_info),
        'sdist': js_prerelease(sdist, strict=True),
        'jsdeps': NPM,
    },
    install_requires=[
        'notebook>=4.3.0',
        'ipython>=1.0.0',
        'ipython_unittest>=0.3.0',
    ],
    include_package_data=True,
    data_files=get_data_files(),
    zip_safe=False,
)

if __name__ == '__main__':
    setup(**SETUP_ARGS)
