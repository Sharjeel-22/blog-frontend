import { Injectable } from "@angular/core";
import BlogPost, { ContentSection } from "../interfaces/HomePage";

@Injectable({
    providedIn: 'root'
})

export class DetailHelperService {

    public provideGeneratedContent(post:BlogPost): ContentSection[]{
        return [
            {
              title: 'Introduction',
              content: `${post.excerpt || 'Welcome to this comprehensive article about ' + post.title + '. This piece explores important concepts and provides valuable insights for readers.'}`
            },
            {
              title: 'Key Points',
              content: `In this section, we delve deeper into the main topics covered in "${post.title}". The insights shared here are based on extensive research and practical experience.`
            },
            {
              title: 'Detailed Analysis',
              content: `Our analysis reveals several important aspects that readers should consider. These findings contribute to a better understanding of the subject matter and provide actionable insights.`
            },
            {
              title: 'Practical Applications',
              content: `Here we explore how the concepts discussed can be applied in real-world scenarios. These practical examples help bridge the gap between theory and implementation.`
            },
            {
              title: 'Conclusion',
              content: `To summarize, this article on "${post.title}" provides valuable insights that can benefit readers in their personal and professional endeavors. We encourage continued learning and exploration of these topics.`
            }
          ]
    }
}