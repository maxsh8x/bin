from string import Template

from lib.config import get_config

cfg = get_config()


def render(tpl_name, mapping=None):
    tpl_dir = cfg.get('app', 'template-dir')
    tpl_ext = cfg.get('app', 'template-extension')
    tpl_path = f'./{tpl_dir}/{tpl_name}.{tpl_ext}'
    layout = f'./{tpl_dir}/layout.{tpl_ext}'

    with open(layout) as layout:
        layout_string = layout.read()

    with open(tpl_path) as tpl:
        tpl_string = tpl.read()

    if not mapping:
        mapping = {}
    mapping["content"] = Template(tpl_string).safe_substitute(mapping)
    return Template(layout_string).safe_substitute(mapping)
