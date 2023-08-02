{
    "targets": [
        {
            "target_name": "addon",
            "cflags!": ["-fexceptions"],
            "cflags_cc!": ["-fexceptions"],
            "sources": ["addons/hello.cc"],
            "include_dirs": [
                "<!(node -p \"require('node-addon-api').include_dir\")",
                #'<!@(pkg-config --cflags libpng | sed "s/-I//g")',
            ],
            "defines": ["NAPI_CPP_EXCEPTIONS"],
            "libraries": [
                #'<!@(pkg-config --libs libpng)'
            ],
            "conditions": [
                [
                    'OS=="mac"',
                    {
                        "xcode_settings": {
                            "GCC_ENABLE_CPP_EXCEPTIONS": "YES",
                            "OTHER_CFLAGS": ["-std=c++17", "-stdlib=libc++"],
                        }
                    },
                ]
            ],
        }
    ]
}
