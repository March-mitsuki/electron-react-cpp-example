#include <napi.h>

namespace demo {

Napi::Value AddMethod(const Napi::CallbackInfo &info) {
    Napi::Env env = info.Env();

    // Check the number of arguments passed.
    if (info.Length() < 2) {
        Napi::TypeError::New(env, "Wrong number of arguments")
            .ThrowAsJavaScriptException();
        return env.Null();
    }

    // Check the argument type
    if (!info[0].IsNumber() || !info[1].IsNumber()) {
        Napi::TypeError::New(env, "Wrong arguments")
            .ThrowAsJavaScriptException();
        return env.Null();
    }

    // Perform the operation
    double p1 = info[0].As<Napi::Number>().DoubleValue();
    double p2 = info[1].As<Napi::Number>().DoubleValue();
    Napi::Number answer = Napi::Number::New(env, p1 + p2);

    return answer;
}

Napi::Object Initialize(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "add"),
                Napi::Function::New(env, AddMethod));
    return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Initialize)

} // namespace demo
