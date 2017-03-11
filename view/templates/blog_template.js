/*
 * Copyright (C) 2017 MINDORKS NEXTGEN PRIVATE LIMITED
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://mindorks.com/license/apache-v2
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */

/**
 * Created by janisharali on 12/03/17.
 */

class BlogTemplate{

    constructor(blog){
        this._blog = blog;
    }

    get _blog(){
        return this.blog;
    }

    set _blog(blog){
        this.blog = blog;
    }

    build(){
        return "<!DOCTYPE html>\n" +
            "<html>\n" +
            "<head>\n" +
            "<title>Page Title</title>\n" +
            "\n" +
            "\n" +
            "    <!-- Bootstrap Core CSS -->\n" +
            "    <link href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\" rel=\"stylesheet\">\n" +
            "\n" +
            "    <!-- Theme CSS -->\n" +
            "    <link href=\"/view/public/css/clean-blog.min.css\" rel=\"stylesheet\">\n" +
            "    <link href=\"/view/public/css/editor.css\" rel=\"stylesheet\">\n" +
            "\n" +
            "    <!-- Custom Fonts -->\n" +
            "    <link href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css\" rel=\"stylesheet\"\n" +
            "          type=\"text/css\">\n" +
            "    <link href='https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic' rel='stylesheet'\n" +
            "          type='text/css'>\n" +
            "    <link href='https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800'\n" +
            "          rel='stylesheet' type='text/css'>\n" +
            "\n" +
            "    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->\n" +
            "    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->\n" +
            "    <!--[if lt IE 9]>\n" +
            "    <script src=\"https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js\"></script>\n" +
            "    <script src=\"https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js\"></script>\n" +
            "    <![endif]-->\n" +
            "</head>\n" +
            "<body>\n" +
            "\n" +
            "<!-- Navigation -->\n" +
            "<nav class=\"navbar navbar-default navbar-custom navbar-fixed-top\" style=\"background-color: #222;\">\n" +
            "    <div class=\"container-fluid\">\n" +
            "        <!-- Brand and toggle get grouped for better mobile display -->\n" +
            "        <div class=\"navbar-header page-scroll\">\n" +
            "            <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\"\n" +
            "                    data-target=\"#bs-example-navbar-collapse-1\">\n" +
            "                <span class=\"sr-only\">Toggle navigation</span>\n" +
            "                Menu <i class=\"fa fa-bars\"></i>\n" +
            "            </button>\n" +
            "            <a class=\"navbar-brand\" href=\"/\">Mindorks</a>\n" +
            "        </div>\n" +
            "\n" +
            "        <!-- Collect the nav links, forms, and other content for toggling -->\n" +
            "        <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n" +
            "            <ul class=\"nav navbar-nav navbar-right\">\n" +
            "                <li>\n" +
            "                    <a href=\"/\">Home</a>\n" +
            "                </li>\n" +
            "                <li>\n" +
            "                    <a href=\"/about\">About</a>\n" +
            "                </li>\n" +
            "                <li>\n" +
            "                    <a href=\"/post\">Sample Post</a>\n" +
            "                </li>\n" +
            "                <li>\n" +
            "                    <a href=\"/contact\">Contact</a>\n" +
            "                </li>\n" +
            "            </ul>\n" +
            "        </div>\n" +
            "        <!-- /.navbar-collapse -->\n" +
            "    </div>\n" +
            "    <!-- /.container -->\n" +
            "</nav>\n" +
            "\n" +
            "<header>\n" +
            "    <div class=\"container text-area\">\n" +
            "        <div class=\"row\">\n" +
            "            <div class=\"col-sm-2\"></div>\n" +
            "            <div class=\"col-sm-8\">\n" +
            "                \n" + '<h1>' + this._blog._title + '</h1>'+
            "                \n" + this._blog._text +
            "            </div>\n" +
            "            <div class=\"col-sm-2\"></div>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "</header>\n" +
            "\n" +
            "<!-- Footer -->\n" +
            "<footer>\n" +
            "    <div class=\"container\">\n" +
            "        <div class=\"row\">\n" +
            "            <div class=\"col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1\">\n" +
            "                <ul class=\"list-inline text-center\">\n" +
            "                    <li>\n" +
            "                        <a href=\"#\">\n" +
            "                                <span class=\"fa-stack fa-lg\">\n" +
            "                                    <i class=\"fa fa-circle fa-stack-2x\"></i>\n" +
            "                                    <i class=\"fa fa-twitter fa-stack-1x fa-inverse\"></i>\n" +
            "                                </span>\n" +
            "                        </a>\n" +
            "                    </li>\n" +
            "                    <li>\n" +
            "                        <a href=\"#\">\n" +
            "                                <span class=\"fa-stack fa-lg\">\n" +
            "                                    <i class=\"fa fa-circle fa-stack-2x\"></i>\n" +
            "                                    <i class=\"fa fa-facebook fa-stack-1x fa-inverse\"></i>\n" +
            "                                </span>\n" +
            "                        </a>\n" +
            "                    </li>\n" +
            "                    <li>\n" +
            "                        <a href=\"#\">\n" +
            "                                <span class=\"fa-stack fa-lg\">\n" +
            "                                    <i class=\"fa fa-circle fa-stack-2x\"></i>\n" +
            "                                    <i class=\"fa fa-github fa-stack-1x fa-inverse\"></i>\n" +
            "                                </span>\n" +
            "                        </a>\n" +
            "                    </li>\n" +
            "                </ul>\n" +
            "                <p class=\"copyright text-muted\">Copyright &copy; Mindorks 2017</p>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "</footer>\n" +
            "\t\n" +
            "\t<!-- jQuery -->\n" +
            "    <script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js\"></script>\n" +
            "\n" +
            "    <!-- Bootstrap Core JavaScript -->\n" +
            "    <script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js\"></script>\n" +
            "\n" +
            "\t<!-- Editor Javascript -->\n" +
            "\t<script src=\"/view/public/js/editor.js\"></script>\n" +
            "\n" +
            "    <!-- Theme JavaScript -->\n" +
            "    <script src=\"/view/public/js/clean-blog.min.js\"></script>\n" +
            "</body>\n" +
            "</html>";
    }
}

module.exports = BlogTemplate;