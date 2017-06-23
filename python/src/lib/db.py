import sqlite3
import os.path
import logging

from lib.config import get_config
from definitions import prj_root

cfg = get_config()


def dict_factory(cursor, row):
    result = {}
    for idx, col in enumerate(cursor.description):
        result[col[0]] = row[idx]
    return result


def init_db(conn):
    init_file = f'{prj_root}/sql/init_data.sql'
    with open(init_file) as f:
        query = f.read()
    c = conn.cursor()
    c.executescript(query)
    conn.commit()


def get_conn():
    db_path = cfg.get('db', 'path')
    if os.path.isfile(db_path):
        conn = sqlite3.connect(db_path)
    else:
        logging.warning('**** db not found. Used in-memory empty db ****')
        conn = sqlite3.connect(':memory:')
        init_db(conn)
    conn.row_factory = dict_factory
    return conn
