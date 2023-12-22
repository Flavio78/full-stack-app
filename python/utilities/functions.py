#!/usr/bin/python3

"""Utility functions for all modules
"""


from colorama import Fore, Style, init


def print_error(error: object) -> None:
    """Print error message with red text

    Args:
        error (object): generic object error
    """
    init()
    print(f"{Fore.RED}ERROR: {error}{Style.RESET_ALL}")
