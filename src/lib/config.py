import configparser

from definitions import prj_root


def get_config():
    cfg = configparser.ConfigParser()
    cfg.read(f'{prj_root}/../config.cfg')
    return cfg
