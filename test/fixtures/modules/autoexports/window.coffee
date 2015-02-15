window =
    description: "
        This module dangerously overrides window in the mokuai context with this object.
        Fortunately, we prepended a file that saves originalWindow, so you can still use it.
        "
    isWindow: -> this is window
    isOriginalWindow: -> this is originalWindow
