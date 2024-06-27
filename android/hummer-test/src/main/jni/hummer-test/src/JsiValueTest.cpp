//
// Created by didi on 2024/6/14.
//

#include "JsiValueTest.h"
#include "falcon/logger.h"

void JsiValueTest::testJsiValueProtect() {


    JsiBoolean *jsiBoolean = new JsiBoolean();
    jsiBoolean->unprotect();

    JsiNumber *jsiNumber = new JsiNumber(100.1);
    jsiNumber->unprotect();

    JsiString *jsiString = new JsiString("jsiString test");
    jsiString->unprotect();

    JsiFunction *jsiFunction = new JsiFunction();
    jsiFunction->unprotect();

    JsiObject *jsiObject = new JsiObject();
    jsiObject->unprotect();

    JsiArray *jsiArray = new JsiArray();

    jsiArray->unprotect();

    jsiArray->unprotect();
    jsiArray->unprotect();

    jsiArray->protect();
    jsiArray->protect();

    warn("testJsiValueProtect() size=%zu", JsiValuePools::getPoolSize());

}

void JsiValueTest::testJsiValueProtect2() {


    JsiBoolean *jsiBoolean = new JsiBoolean();
    JsiNumber *jsiNumber = new JsiNumber(100.1);
    JsiString *jsiString = new JsiString("jsiString test");
    JsiFunction *jsiFunction = new JsiFunction();
    JsiObject *jsiObject = new JsiObject();
    JsiArray *jsiArray = new JsiArray();


    jsiBoolean->unprotect();
    jsiNumber->unprotect();
    jsiString->unprotect();
    jsiFunction->unprotect();
    jsiObject->unprotect();
    jsiArray->unprotect();


    jsiArray->unprotect();
    jsiArray->unprotect();

    jsiArray->protect();
    jsiArray->protect();

    warn("testJsiValueProtect() size=%zu", JsiValuePools::getPoolSize());

}
